/* ==========================================================================
   WhatsApp Privacy Blur - Popup Dashboard Script
   ========================================================================== */

// Default settings object
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

// UI Elements
const dashboard = document.querySelector('.dashboard');
const enabledToggle = document.getElementById('enabled-toggle');
const statusText = document.getElementById('master-status-text');
const blurSlider = document.getElementById('blur-intensity');
const blurValDisplay = document.getElementById('blur-val-display');

const toggleAvatars = document.getElementById('toggle-avatars');
const toggleNames = document.getElementById('toggle-names');
const togglePreviews = document.getElementById('toggle-previews');
const toggleTextChats = document.getElementById('toggle-text-chats');
const toggleMediaChats = document.getElementById('toggle-media-chats');
const toggleInputChats = document.getElementById('toggle-input-chats');

// Compose Input opacity sub-slider elements
const inputOpacitySlider = document.getElementById('input-opacity-slider');
const inputOpacityVal = document.getElementById('input-opacity-val');
const inputOpacityPanel = document.getElementById('input-opacity-panel');

/** Shows or hides the opacity sub-panel based on toggle state */
function syncInputOpacityPanel() {
  if (inputOpacityPanel) {
    inputOpacityPanel.style.display = toggleInputChats.checked ? 'block' : 'none';
  }
}

/**
 * Updates the dashboard's visual theme based on the active state.
 * When disabled, elements are visually dimmed to represent an inactive state.
 */
function updateDashboardState(enabled) {
  if (enabled) {
    dashboard.classList.remove('shield-off');
    statusText.textContent = 'Shield Active';
  } else {
    dashboard.classList.add('shield-off');
    statusText.textContent = 'Shield Suspended';
  }
}

/**
 * Collects the current state of settings from the UI controls.
 */
function getSettingsFromUI() {
  return {
    enabled: enabledToggle.checked,
    blurAmount: parseInt(blurSlider.value, 10),
    blurAvatars: toggleAvatars.checked,
    blurNames: toggleNames.checked,
    blurPreviews: togglePreviews.checked,
    blurTextChats: toggleTextChats.checked,
    blurMediaChats: toggleMediaChats.checked,
    blurInputChats: toggleInputChats.checked,
    inputOpacity: parseInt(inputOpacitySlider.value, 10)
  };
}

/**
 * Saves current UI settings to storage and broadcasts them to content scripts.
 */
function saveAndSyncSettings() {
  const settings = getSettingsFromUI();

  // Update dashboard visuals
  updateDashboardState(settings.enabled);
  blurValDisplay.textContent = `${settings.blurAmount}px`;

  // 1. Save to local storage
  chrome.storage.local.set(settings, () => {
    // 2. Broadcast immediately to all active WhatsApp Web tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        // Send updates only to tabs matching our target URLs to avoid unnecessary overhead
        if (tab.url && (
          tab.url.includes("web.whatsapp.com") ||
          tab.url.includes("Chats.htm") ||
          tab.url.includes("Home.htm") ||
          tab.url.includes("Chats.html") ||
          tab.url.includes("Home.html")
        )) {
          chrome.tabs.sendMessage(tab.id, {
            action: 'updateSettings',
            settings: settings
          }, () => {
            // Ignore error callback in case content script is not yet injected
            if (chrome.runtime.lastError) {
              // Silently absorb
            }
          });
        }
      });
    });
  });
}

/**
 * Initializes the dashboard controls with saved preferences.
 */
function initDashboard() {
  chrome.storage.local.get(DEFAULT_SETTINGS, (settings) => {
    // Set UI control values
    enabledToggle.checked = settings.enabled;
    blurSlider.value = settings.blurAmount;
    blurValDisplay.textContent = `${settings.blurAmount}px`;

    toggleAvatars.checked = settings.blurAvatars;
    toggleNames.checked = settings.blurNames;
    togglePreviews.checked = settings.blurPreviews;
    toggleTextChats.checked = settings.blurTextChats;
    toggleMediaChats.checked = settings.blurMediaChats;
    toggleInputChats.checked = settings.blurInputChats;

    // Initialize opacity sub-slider
    const opacity = settings.inputOpacity !== undefined ? settings.inputOpacity : DEFAULT_SETTINGS.inputOpacity;
    inputOpacitySlider.value = opacity;
    inputOpacityVal.textContent = `${opacity}%`;
    syncInputOpacityPanel();

    // Apply active dashboard theme
    updateDashboardState(settings.enabled);
  });
}

// Bind Change Event Listeners to all controls
enabledToggle.addEventListener('change', saveAndSyncSettings);
toggleAvatars.addEventListener('change', saveAndSyncSettings);
toggleNames.addEventListener('change', saveAndSyncSettings);
togglePreviews.addEventListener('change', saveAndSyncSettings);
toggleTextChats.addEventListener('change', saveAndSyncSettings);
toggleMediaChats.addEventListener('change', saveAndSyncSettings);
toggleInputChats.addEventListener('change', () => {
  syncInputOpacityPanel();
  saveAndSyncSettings();
});

// Opacity sub-slider: update label live, save on change
inputOpacitySlider.addEventListener('input', () => {
  inputOpacityVal.textContent = `${inputOpacitySlider.value}%`;
});
inputOpacitySlider.addEventListener('change', saveAndSyncSettings);

// Bind real-time input dragging to update values
blurSlider.addEventListener('input', () => {
  blurValDisplay.textContent = `${blurSlider.value}px`;
});
blurSlider.addEventListener('change', saveAndSyncSettings);

// Load settings on startup
document.addEventListener('DOMContentLoaded', initDashboard);

// Sync popup UI in real-time if settings are changed externally (e.g., via keyboard shortcut in content script)
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    chrome.storage.local.get(DEFAULT_SETTINGS, (settings) => {
      if (enabledToggle && enabledToggle.checked !== settings.enabled) {
        enabledToggle.checked = settings.enabled;
        updateDashboardState(settings.enabled);
      }
    });
  }
});

