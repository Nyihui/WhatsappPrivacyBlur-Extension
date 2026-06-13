/* ==========================================================================
   WhatsApp Privacy Blur - Content Script
   Depends on: selectors/ (loaded first via manifest.json)
   ========================================================================== */

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

/* --------------------------------------------------------------------------
   CSS Generator
   Iterates WA_BLUR_RULES from selectors.js and builds a complete stylesheet.
   Hover-reveal selectors are auto-generated — no manual duplication needed.
-------------------------------------------------------------------------- */
function buildCSS(settings) {
  const ROOT = '.wa-privacy-enabled';
  const transition = settings.noTransition
    ? 'none'
    : 'filter 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
  let css = '';

  for (const rule of window.WA_BLUR_RULES) {
    const isActive = settings[rule.key] !== undefined
      ? settings[rule.key]
      : DEFAULT_SETTINGS[rule.key];

    // --- Special: No Transition Delay ---
    if (rule.special === 'noTransition') {
      if (isActive) {
        css += `${ROOT} * { transition: none !important; }\n`;
      }
      continue;
    }

    if (!isActive || !rule.targets || rule.targets.length === 0) continue;

    const scope = ROOT;
    const scopedTargets = rule.targets.map(t => `${scope} ${t}`);
    const blurSelectors = scopedTargets.join(',\n');
    const hoverSelectors = scopedTargets.map(t => `${t}:hover`).join(',\n');

    // --- Opacity mode (Text Input) ---
    if (rule.property === 'opacity') {
      css += `
      ${blurSelectors} {
        opacity: var(--wa-input-opacity) !important;
        transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        will-change: opacity;
      }
      ${hoverSelectors} {
        opacity: 1 !important;
      }`;
      continue;
    }

    // --- Filter/blur mode (everything else) ---
    const multiplier = rule.blurMultiplier || 1;
    const blurValue = multiplier === 1
      ? 'var(--wa-blur-amount)'
      : `calc(var(--wa-blur-amount) * ${multiplier})`;

    css += `
    ${blurSelectors} {
      filter: blur(${blurValue}) !important;
      transition: ${transition} !important;
      will-change: filter;
      transform: translateZ(0);
    }
    ${hoverSelectors} {
      filter: blur(0px) !important;
    }`;

    // --- hoverParentTargets: blur a child, unblur when PARENT is hovered ---
    if (rule.hoverParentTargets && rule.hoverParentTargets.length > 0) {
      for (const { hoverParent, child } of rule.hoverParentTargets) {
        const childBlur = `${scope} ${hoverParent} ${child}`;
        const childHover = `${scope} ${hoverParent}:hover ${child}`;
        css += `
        ${childBlur} {
          filter: blur(${blurValue}) !important;
          transition: ${transition} !important;
          will-change: filter;
          transform: translateZ(0);
        }
        ${childHover} {
          filter: blur(0px) !important;
        }`;
      }
    }

    // --- hoverHasTargets: blur a child, unblur only when a SPECIFIC sibling/overlay/child is hovered ---
    // Uses :has() on a common ancestor. If child is empty, the ancestor itself is blurred.
    if (rule.hoverHasTargets && rule.hoverHasTargets.length > 0) {
      for (const { ancestor, hoverTrigger, child } of rule.hoverHasTargets) {
        const childPart = child ? ` ${child}` : '';
        const childBlur  = `${scope} ${ancestor}${childPart}`;
        const childHover = `${scope} ${ancestor}:has(${hoverTrigger}:hover)${childPart}`;
        css += `
        ${childBlur} {
          filter: blur(${blurValue}) !important;
          transition: ${transition} !important;
          will-change: filter;
          transform: translateZ(0);
        }
        ${childHover} {
          filter: blur(0px) !important;
        }`;
      }
    }
  }

  return css;
}

/* --------------------------------------------------------------------------
   Style Injector
   Writes the generated CSS into a single <style> tag in <head>.
   Replaces contents on every settings update — no stale rules accumulate.
-------------------------------------------------------------------------- */
function injectCSS(css) {
  let el = document.getElementById('wa-privacy-blur-styles');
  if (!el) {
    el = document.createElement('style');
    el.id = 'wa-privacy-blur-styles';
    (document.head || document.documentElement).appendChild(el);
  }
  el.textContent = css;
}

/* --------------------------------------------------------------------------
   Apply Settings
   Applies CSS variables, toggles the master class, and rebuilds the stylesheet.
-------------------------------------------------------------------------- */
function applySettings(settings) {
  const root = document.documentElement;

  // 1. CSS custom properties
  const blurPx = settings.blurAmount !== undefined ? settings.blurAmount : DEFAULT_SETTINGS.blurAmount;
  const opacityPct = settings.inputOpacity !== undefined ? settings.inputOpacity : DEFAULT_SETTINGS.inputOpacity;
  root.style.setProperty('--wa-blur-amount', `${blurPx}px`);
  root.style.setProperty('--wa-input-opacity', (opacityPct / 100).toFixed(2));

  // 2. Master privacy class
  const isEnabled = settings.enabled !== undefined ? settings.enabled : DEFAULT_SETTINGS.enabled;
  root.classList.toggle('wa-privacy-enabled', isEnabled);

  // 3. Generate & inject dynamic stylesheet
  injectCSS(isEnabled ? buildCSS(settings) : '');

  // console.log('[Privacy Blur] Applied settings:', settings);
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

// Load and apply on page start
chrome.storage.local.get(window.WA_DEFAULT_SETTINGS, applySettings);

// 1. Message from popup (immediate, low-latency path)
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'updateSettings' && message.settings) {
    applySettings(message.settings);
    sendResponse?.({ success: true });
  }
});

// 2. Storage change (sync path — covers keyboard shortcut + cross-tab changes)
chrome.storage.onChanged.addListener((_changes, areaName) => {
  if (areaName === 'local') {
    chrome.storage.local.get(DEFAULT_SETTINGS, applySettings);
  }
});

// 3. Keyboard shortcut: Alt + / → toggle master shield
window.addEventListener('keydown', (event) => {
  if (event.altKey && (event.key === '/' || event.code === 'Slash')) {
    event.preventDefault();
    chrome.storage.local.get(DEFAULT_SETTINGS, (settings) => {
      const isEnabled = settings.enabled !== undefined ? settings.enabled : DEFAULT_SETTINGS.enabled;
      chrome.storage.local.set({ enabled: !isEnabled }, () => {
        // console.log(`[Privacy Blur] Shield toggled via Alt+/. New state: ${!isEnabled}`);
      });
    });
  }
});
