/* ==========================================================================
   WhatsApp Privacy Blur - Content Script
   ========================================================================== */

// Default configuration settings
const DEFAULT_SETTINGS = {
  enabled: true,
  blurAmount: 3,
  blurAvatars: true,
  blurNames: true,
  blurPreviews: true,
  blurTextChats: true,
  blurMediaChats: true,
  blurInputChats: true,
  inputOpacity: 30
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

  // 1b. Apply the compose input opacity CSS variable (stored as 0-100 integer, converted to 0.0-1.0)
  const opacityPct = settings.inputOpacity !== undefined ? settings.inputOpacity : DEFAULT_SETTINGS.inputOpacity;
  root.style.setProperty('--wa-input-opacity', (opacityPct / 100).toFixed(2));

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

// 3. Listen for shortcut keys (Alt + /) to quick toggle the privacy shield
window.addEventListener('keydown', (event) => {
  if (event.altKey && (event.key === '/' || event.code === 'Slash')) {
    event.preventDefault();
    chrome.storage.local.get(DEFAULT_SETTINGS, (settings) => {
      const isEnabled = settings.enabled !== undefined ? settings.enabled : DEFAULT_SETTINGS.enabled;
      chrome.storage.local.set({ enabled: !isEnabled }, () => {
        console.log(`[Privacy Blur] Shield toggled via Alt+/ shortcut. New state: ${!isEnabled}`);
      });
    });
  }
});

