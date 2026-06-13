/* ==========================================================================
   WhatsApp Privacy Blur - Chat Text Selectors
   Rule key: blurTextChats
   ========================================================================== */

window.WA_BLUR_RULES.push({
  key: 'blurTextChats',
  className: 'wa-blur-text',
  label: 'All Messages In Chat',
  property: 'filter',
  blurMultiplier: 1,
  targets: [
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] div:has( > span[data-testid*="selectable-text"])',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] div:has( > div[class*="copyable-text"]):has(p)',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] div:has( > div[data-testid*="selectable-text"]):has(img)',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-messages"] [data-testid="msg-notification-container"] [data-testid="group-notification-context-card"] [data-testid="group-notification-context-card-title"]',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-messages"] [data-testid="msg-notification-container"] [data-testid="group-notification-context-card"] [data-testid="group-notification-context-card-subtitle"]',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-messages"] [data-testid="msg-notification-container"] [data-testid*="subtype"]',
    '[data-testid="drawer-middle"] [class*="copyable-area"] div:has( > [role="button"][aria-label="Close"]) > div:nth-child(2):has(span)',
    '[data-testid="media-viewer-modal"] [data-testid="media-caption"]',
    //  Group Descriptions
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-messages"] [data-testid="msg-notification-container"] [data-testid="group-notification-context-card"] div:has( > span[data-testid*="group-notification-context-card-description"])',
    '[data-testid="chat-info-drawer"] [data-testid="group-info-drawer-body"] [data-testid="group-info-drawer-description-container"] div:has( > span[data-testid*="group-info-drawer-description-title-input-read-only"])',
    //  Story Captions
    '[data-testid="status-player-uie"] span[dir="auto"]:not(button[data-testid="status-player-contact-name"] *):not([class*="html-span"] *)',
  ],
});
