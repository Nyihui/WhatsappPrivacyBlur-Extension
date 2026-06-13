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

    function updateCLBGlow() {
      const clb = document.getElementById(CLB_ID);
      if (!clb) return;
      if (isOpen) {
        const isDark = document.body.classList.contains('dark');
        const glowColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.6)';
        clb.style.filter = `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 4px ${glowColor})`;
        clb.style.transform = 'scale(1.08)';
      } else {
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

    // Simple filled shield — no stroke, no gradient, just fill="currentColor"
    const CLB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"'
      + ' preserveAspectRatio="xMidYMid meet" fill="currentColor">'
      + '<path d="M12 2L4 5v6c0 5.25 3.4 10.15 8 11.35'
      + 'C16.6 21.15 20 16.25 20 11V5l-8-3z"/>'
      + '</svg>';

    // Reads the exact color from the sibling Media button so it always matches
    // whether WhatsApp is in dark or light mode.
    function getCLBColor() {
      const ref = document.querySelector('button[aria-label="Media"][data-navbar-item="true"]');
      if (ref) return getComputedStyle(ref).color;
      return document.body.classList.contains('dark') ? '#aebac1' : '#54656f';
    }

    function injectChatlistBtn() {
      if (document.getElementById(CLB_ID)) return;

      // Find the Media button and walk up 3 levels to its wrapper:
      //   button → div → span → div (direct child of the flex navbar row)
      const mediaBtn = document.querySelector('button[aria-label="Media"][data-navbar-item="true"]');
      if (!mediaBtn) return;

      let mediaWrapper = mediaBtn;
      for (let i = 0; i < 3; i++) {
        mediaWrapper = mediaWrapper.parentElement;
        if (!mediaWrapper) return;
      }
      const navContainer = mediaWrapper.parentElement;
      if (!navContainer) return;

      const clbBtn = document.createElement('button');
      clbBtn.id = CLB_ID;
      clbBtn.type = 'button';
      clbBtn.title = 'Privacy Blur';               // native hover tooltip
      clbBtn.setAttribute('aria-label', 'Privacy Blur');
      
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(CLB_SVG, 'image/svg+xml');
      clbBtn.appendChild(svgDoc.documentElement);
      
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
