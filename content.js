/* ==========================================================================
   WhatsApp Privacy Blur - Content Script
   ========================================================================== */

// Default configuration settings
const DEFAULT_SETTINGS = {
  enabled: true,
  blurAmount: 8,
  blurAvatars: true,
  blurNames: true,
  blurPreviews: true,
  blurTextChats: true,
  blurMediaChats: true,
  blurInputChats: true
};

/**
 * Applies settings to the document root (html tag).
 * Applying to documentElement allows immediate execution at document_start
 * and prevents any flash of unblurred private information.
 */
function applySettings(settings) {
  const root = document.documentElement;
  
  // 1. Apply the custom blur intensity CSS variable
  const blurPx = settings.blurAmount !== undefined ? settings.blurAmount : DEFAULT_SETTINGS.blurAmount;
  root.style.setProperty('--wa-blur-amount', `${blurPx}px`);

  // 2. Toggle the global privacy state
  const isEnabled = settings.enabled !== undefined ? settings.enabled : DEFAULT_SETTINGS.enabled;
  if (isEnabled) {
    root.classList.add('wa-privacy-enabled');
  } else {
    root.classList.remove('wa-privacy-enabled');
  }

  // 3. Toggle individual feature filters
  const featureList = [
    { key: 'blurAvatars', className: 'wa-blur-avatars' },
    { key: 'blurNames', className: 'wa-blur-names' },
    { key: 'blurPreviews', className: 'wa-blur-previews' },
    { key: 'blurTextChats', className: 'wa-blur-text' },
    { key: 'blurMediaChats', className: 'wa-blur-media' },
    { key: 'blurInputChats', className: 'wa-blur-input' }
  ];

  featureList.forEach(feature => {
    const val = settings[feature.key] !== undefined ? settings[feature.key] : DEFAULT_SETTINGS[feature.key];
    if (val) {
      root.classList.add(feature.className);
    } else {
      root.classList.remove(feature.className);
    }
  });

  // Diagnostic log to easily verify active shields in browser developer tools
  console.log("[Privacy Blur] Current Active Classes:", root.className, "Settings:", settings);
}

// Immediately load settings and apply them
chrome.storage.local.get(DEFAULT_SETTINGS, (settings) => {
  applySettings(settings);
});

// 1. Listen for dynamic message-based settings updates from the popup dashboard
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateSettings' && message.settings) {
    applySettings(message.settings);
    if (sendResponse) sendResponse({ success: true });
  }
});

// 2. Listen for storage onChanged events (guarantees real-time sync across both web and local offline files)
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    chrome.storage.local.get(DEFAULT_SETTINGS, (settings) => {
      applySettings(settings);
    });
  }
});

/**
 * Temporary master reveal keybind:
 * Holding down the "Alt" key (or another modifier) will temporarily reveal everything.
 * Releasing the key will restore the blurs.
 */
window.addEventListener('keydown', (e) => {
  // If user presses Alt key, temporarily lift all blurs
  if (e.key === 'Alt') {
    document.documentElement.classList.add('wa-force-reveal');
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Alt') {
    document.documentElement.classList.remove('wa-force-reveal');
  }
});

// Fallback: remove force-reveal if window loses focus to prevent stuck state
window.addEventListener('blur', () => {
  document.documentElement.classList.remove('wa-force-reveal');
});
