/* ==========================================================================
   WhatsApp Privacy Blur - Settings Panel
   Depends on (loaded first via manifest.json):
     panel/styles.js   → window.WA_PANEL_STYLES
     panel/template.js → window.WA_PANEL_HTML, window.WA_PANEL_SHIELD_SVG
   ========================================================================== */

(function () {
  'use strict';

  const DEFAULT_SETTINGS = {
    enabled: true,
    blurAmount: 3,
    blurAvatars: true,
    blurNames: true,
    blurPreviews: true,
    blurTextChats: true,
    blurStickers: true,
    blurMediaPreview: true,
    blurMediaGallery: true,
    blurInput: true,
    noTransition: false,
    inputOpacity: 30,
  };

  const PANEL_W = 320;  // px — matches #wa-panel width in css.js
  const PANEL_GAP = 8;    // px — gap between anchor and panel
  const EDGE_MARGIN = 12;   // px — minimum distance from viewport edges

  /* --------------------------------------------------------------------------
     Toggle map: FAB element id → chrome.storage key
  -------------------------------------------------------------------------- */
  const TOGGLE_MAP = [
    { id: 'fab-toggle-avatars', key: 'blurAvatars' },
    { id: 'fab-toggle-names', key: 'blurNames' },
    { id: 'fab-toggle-previews', key: 'blurPreviews' },
    { id: 'fab-toggle-text-chats', key: 'blurTextChats' },
    { id: 'fab-toggle-stickers', key: 'blurStickers' },
    { id: 'fab-toggle-media-preview', key: 'blurMediaPreview' },
    { id: 'fab-toggle-media-gallery', key: 'blurMediaGallery' },
    { id: 'fab-toggle-input', key: 'blurInput' },
    { id: 'fab-toggle-no-transition', key: 'noTransition' },
  ];

  /* --------------------------------------------------------------------------
     Apply storage settings → FAB controls
  -------------------------------------------------------------------------- */
  function applyToFAB(shadow, settings) {
    const dashboard = shadow.getElementById('wa-dashboard');
    if (!dashboard) return;

    const enabled = settings.enabled ?? DEFAULT_SETTINGS.enabled;
    shadow.getElementById('fab-enabled').checked = enabled;
    dashboard.classList.toggle('shield-off', !enabled);

    const blurAmount = settings.blurAmount ?? DEFAULT_SETTINGS.blurAmount;
    shadow.getElementById('fab-blur-intensity').value = blurAmount;
    shadow.getElementById('fab-blur-val').textContent = `${blurAmount}px`;

    for (const { id, key } of TOGGLE_MAP) {
      const el = shadow.getElementById(id);
      if (el) el.checked = settings[key] ?? DEFAULT_SETTINGS[key];
    }

    const inputOpacity = settings.inputOpacity ?? DEFAULT_SETTINGS.inputOpacity;
    shadow.getElementById('fab-input-opacity-slider').value = inputOpacity;
    shadow.getElementById('fab-input-opacity-val').textContent = `${inputOpacity}%`;
    const inputEnabled = settings.blurInput ?? DEFAULT_SETTINGS.blurInput;
    shadow.getElementById('fab-input-opacity-panel').style.display = inputEnabled ? '' : 'none';
  }

  /**
   * Place the panel adjacent to an anchor element.
   * @param {HTMLElement} panel
   * @param {DOMRect} anchorRect  — getBoundingClientRect() of the trigger button
   */
  function positionPanel(panel, anchorRect) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const anchorTop = anchorRect.top;
    const anchorBottom = anchorRect.bottom;
    const anchorRight = anchorRect.right;

    // Horizontal: align panel right edge with anchor right edge, clamp
    let left = anchorRight - PANEL_W;
    left = Math.max(EDGE_MARGIN, Math.min(left, vw - PANEL_W - EDGE_MARGIN));
    panel.style.left = `${left}px`;
    panel.style.right = '';

    const spaceAbove = anchorTop - EDGE_MARGIN - PANEL_GAP;
    const spaceBelow = vh - anchorBottom - PANEL_GAP - EDGE_MARGIN;
    const contentH = panel.scrollHeight || 500;

    if (contentH <= spaceAbove || spaceAbove >= spaceBelow) {
      // Show ABOVE anchor
      panel.style.bottom = `${vh - anchorTop + PANEL_GAP}px`;
      panel.style.top = '';
      panel.style.maxHeight = `${Math.min(spaceAbove, vh * 0.8)}px`;
      panel.style.transformOrigin = 'bottom right';
    } else {
      // Show BELOW anchor
      panel.style.top = `${anchorBottom + PANEL_GAP}px`;
      panel.style.bottom = '';
      panel.style.maxHeight = `${Math.min(spaceBelow, vh * 0.8)}px`;
      panel.style.transformOrigin = 'top right';
    }
  }

  /* --------------------------------------------------------------------------
     Mount — build Shadow DOM, wire all event listeners
  -------------------------------------------------------------------------- */
  function mount() {
    if (document.getElementById('wa-privacy-fab-host')) return;

    const host = document.createElement('div');
    host.id = 'wa-privacy-fab-host';
    host.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;';
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    const CLB_ID = 'wa-privacy-clb';

    const styleEl = document.createElement('style');
    styleEl.textContent = window.WA_PANEL_STYLES;
    shadow.appendChild(styleEl);

    const panel = document.createElement('div');
    panel.id = 'wa-panel';
    const parser = new DOMParser();
    const doc = parser.parseFromString(window.WA_PANEL_HTML, 'text/html');
    while (doc.body.firstChild) {
      panel.appendChild(doc.body.firstChild);
    }
    shadow.appendChild(panel);

    // Track the last anchor rect used to open the panel
    let currentAnchorRect = null;

    // Populate version badge from manifest
    const versionEl = shadow.getElementById('fab-version');
    if (versionEl) versionEl.textContent = 'v' + chrome.runtime.getManifest().version;

    // Load initial state from storage
    chrome.storage.local.get(DEFAULT_SETTINGS, (s) => applyToFAB(shadow, s));

    // Re-position panel whenever its content height changes
    const panelResizeObserver = new ResizeObserver(() => {
      if (isOpen && currentAnchorRect) positionPanel(panel, currentAnchorRect);
    });
    panelResizeObserver.observe(panel);

    // ---- Open / Close -------------------------------------------------------
    let isOpen = false;

    function setSafeSVG(element, svgString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, 'image/svg+xml');
      element.replaceChildren(doc.documentElement);
    }

    function updateCLBGlow() {
      const clb = document.getElementById(CLB_ID);
      if (!clb) return;
      if (isOpen) {
        setSafeSVG(clb, SVG_ACTIVE);
        const isDark = document.body.classList.contains('dark');
        const glowColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.6)';
        clb.style.filter = `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 4px ${glowColor})`;
        clb.style.transform = 'scale(1.08)';
      } else {
        setSafeSVG(clb, SVG_INACTIVE);
        clb.style.filter = 'drop-shadow(0 0 0px transparent)';
        clb.style.transform = 'scale(1)';
      }
    }

    function openPanel(anchorRect) {
      currentAnchorRect = anchorRect || currentAnchorRect;
      if (!currentAnchorRect) return;
      isOpen = true;
      positionPanel(panel, currentAnchorRect);
      panel.classList.add('open');
      updateCLBGlow();
      chrome.storage.local.get(DEFAULT_SETTINGS, (s) => applyToFAB(shadow, s));
    }

    function closePanel() {
      isOpen = false;
      panel.classList.remove('open');
      updateCLBGlow();
    }

    function togglePanel(anchorRect) {
      isOpen ? closePanel() : openPanel(anchorRect);
    }

    // Expose API for the chatlist button and browser action
    window.WA_FAB = { open: openPanel, close: closePanel, toggle: togglePanel };

    document.addEventListener('mousedown', (e) => {
      if (!isOpen) return;
      const path = e.composedPath();
      if (path.includes(panel)) return;
      // If the click is on the chatlist button, let its click handler manage
      // the toggle — otherwise mousedown closes and click immediately reopens.
      const clb = document.getElementById(CLB_ID);
      if (clb && path.includes(clb)) return;
      closePanel();
    });

    // ---- Master toggle ------------------------------------------------------
    shadow.getElementById('fab-enabled').addEventListener('change', function () {
      chrome.storage.local.set({ enabled: this.checked });
      shadow.getElementById('wa-dashboard').classList.toggle('shield-off', !this.checked);
    });

    // ---- Individual toggles -------------------------------------------------
    for (const { id, key } of TOGGLE_MAP) {
      const el = shadow.getElementById(id);
      if (!el) continue;
      el.addEventListener('change', function () {
        chrome.storage.local.set({ [key]: this.checked });
        if (key === 'blurInput') {
          shadow.getElementById('fab-input-opacity-panel').style.display = this.checked ? '' : 'none';
        }
      });
    }

    // ---- Sliders ------------------------------------------------------------
    const blurSlider = shadow.getElementById('fab-blur-intensity');
    const blurValEl = shadow.getElementById('fab-blur-val');
    const opacitySlider = shadow.getElementById('fab-input-opacity-slider');
    const opacityValEl = shadow.getElementById('fab-input-opacity-val');

    blurSlider.addEventListener('input', function () {
      blurValEl.textContent = `${this.value}px`;
      chrome.storage.local.set({ blurAmount: parseInt(this.value, 10) });
    });

    opacitySlider.addEventListener('input', function () {
      opacityValEl.textContent = `${this.value}%`;
      chrome.storage.local.set({ inputOpacity: parseInt(this.value, 10) });
    });

    // ---- Reset Button ---------------------------------------------------------
    const resetBtn = shadow.getElementById('fab-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        chrome.storage.local.set(DEFAULT_SETTINGS, () => {
          applyToFAB(shadow, DEFAULT_SETTINGS);
        });
      });
    }

    // ---- Message listener (browser action → togglePanel; popup sync) --------
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'togglePanel') {
        // Triggered by browser extension icon click (via background.js)
        const clb = document.getElementById('wa-privacy-clb');
        const rect = clb ? clb.getBoundingClientRect() : null;
        togglePanel(rect);
        return;
      }
      if (message.action === 'updateSettings' && message.settings) {
        applyToFAB(shadow, message.settings);
        if (!document.body.contains(host)) document.body.appendChild(host);
      }
    });

    // ---- Sync from storage (cross-tab / keyboard shortcut) ------------------
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== 'local') return;
      if (!document.body.contains(host)) document.body.appendChild(host);
      chrome.storage.local.get(DEFAULT_SETTINGS, (s) => applyToFAB(shadow, s));
    });

    // Re-position panel on viewport resize
    window.addEventListener('resize', () => {
      if (isOpen && currentAnchorRect) positionPanel(panel, currentAnchorRect);
    });

    // ---- Chatlist-header button injection -----------------------------------
    // Injected ABOVE the Media (gallery) button.
    // Uses a plain fill="currentColor" shield so it matches WhatsApp's own
    // single-color icon style and automatically adapts to dark/light mode.

    const SVG_ACTIVE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" preserveAspectRatio="xMidYMid meet"><defs><mask id="wa-shield-active-mask" style="mask-type: alpha"><image width="512" height="512" href="data:image/png;base64,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"/></mask></defs><rect width="512" height="512" fill="currentColor" mask="url(#wa-shield-active-mask)"/></svg>';
    const SVG_INACTIVE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" preserveAspectRatio="xMidYMid meet"><defs><mask id="wa-shield-inactive-mask" style="mask-type: alpha"><image width="512" height="512" href="data:image/png;base64,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"/></mask></defs><rect width="512" height="512" fill="currentColor" mask="url(#wa-shield-inactive-mask)"/></svg>';

    // Locates the Media button and its containers without relying on aria-label
    // which changes based on WhatsApp's UI language.
    function getMediaAnchor() {
      const header = document.querySelector('[data-testid="chatlist-header"]');
      if (!header) return null;

      // Method 1: Use the "Me" tab photo as an anchor
      const meTab = header.querySelector('[data-testid="navbar-item-me-tab-photo"]');
      if (meTab) {
        // Walk up 4 levels: meTab -> button -> div -> span -> div (Me wrapper)
        let meWrapper = meTab.parentElement?.parentElement?.parentElement?.parentElement;
        if (meWrapper && meWrapper.previousElementSibling) {
          const mediaWrapper = meWrapper.previousElementSibling;
          const navContainer = meWrapper.parentElement;
          const mediaBtn = mediaWrapper.querySelector('button');
          if (mediaBtn) return { mediaWrapper, navContainer, mediaBtn };
        }
      }

      // Method 2: Fallback to navigating the div structure
      const bottomGroup = header.querySelector('div[style*="flex-grow: 0"]');
      if (bottomGroup && bottomGroup.firstElementChild) {
        const navContainer = bottomGroup.firstElementChild;
        const mediaWrapper = navContainer.firstElementChild;
        const mediaBtn = mediaWrapper ? mediaWrapper.querySelector('button') : null;
        if (mediaWrapper && mediaBtn) return { mediaWrapper, navContainer, mediaBtn };
      }

      return null;
    }

    // Reads the exact color from the sibling Media button so it always matches
    // whether WhatsApp is in dark or light mode.
    function getCLBColor() {
      const anchor = getMediaAnchor();
      if (anchor && anchor.mediaBtn) return getComputedStyle(anchor.mediaBtn).color;
      return document.body.classList.contains('dark') ? '#aebac1' : '#54656f';
    }

    function injectChatlistBtn() {
      if (document.getElementById(CLB_ID)) return;

      const anchor = getMediaAnchor();
      if (!anchor) return;
      const { mediaWrapper, navContainer } = anchor;

      const clbBtn = document.createElement('button');
      clbBtn.id = CLB_ID;
      clbBtn.type = 'button';
      clbBtn.title = 'WhatsApp Privacy Blur';               // native hover tooltip
      clbBtn.setAttribute('aria-label', 'WhatsApp Privacy Blur');

      setSafeSVG(clbBtn, isOpen ? SVG_ACTIVE : SVG_INACTIVE);

      clbBtn.style.cssText = [
        'display:flex', 'align-items:center', 'justify-content:center',
        'width:40px', 'height:40px', 'border:none', 'border-radius:50%',
        'background:transparent', 'cursor:pointer', 'padding:0',
        `color:${getCLBColor()}`,
        'transition:background .15s, color .2s, filter .3s cubic-bezier(0.4, 0, 0.2, 1), transform .3s cubic-bezier(0.4, 0, 0.2, 1)',
        'flex-shrink:0',
      ].join(';');

      clbBtn.addEventListener('mouseenter', () => {
        clbBtn.style.background = 'var(--interactive-temporary,rgba(134,150,160,.12))';
      });
      clbBtn.addEventListener('mouseleave', () => {
        clbBtn.style.background = 'transparent';
      });
      clbBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePanel(clbBtn.getBoundingClientRect());
      });

      const clbWrapper = document.createElement('div');
      clbWrapper.style.cssText = 'display:flex;align-items:center;justify-content:center;';
      clbWrapper.appendChild(clbBtn);
      // Insert ABOVE the Media button (before it in DOM order = above in the UI)
      navContainer.insertBefore(clbWrapper, mediaWrapper);
    }

    // Sync CLB icon color AND persist WhatsApp theme for the popup info page
    function syncThemeAndColor() {
      const isDark = document.body.classList.contains('dark');
      const clb = document.getElementById(CLB_ID);
      if (clb) clb.style.color = getCLBColor();
      // Drive the panel's Material theme via CSS :host([data-theme]) selector
      host.dataset.theme = isDark ? 'dark' : 'light';
      chrome.storage.local.set({ waTheme: isDark ? 'dark' : 'light' });
      updateCLBGlow();
    }
    syncThemeAndColor(); // run once on load
    new MutationObserver(syncThemeAndColor)
      .observe(document.body, { attributeFilter: ['class'] });


    // Re-inject when WhatsApp SPA rebuilds the chatlist header
    const clbObserver = new MutationObserver(() => {
      if (!document.getElementById(CLB_ID)) injectChatlistBtn();
    });
    clbObserver.observe(document.documentElement, { childList: true, subtree: true });
    injectChatlistBtn();
  }

  /* --------------------------------------------------------------------------
     Bootstrap
  -------------------------------------------------------------------------- */
  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }

})();
