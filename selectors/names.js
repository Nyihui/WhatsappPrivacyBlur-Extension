/* ==========================================================================
   WhatsApp Privacy Blur - Name Selectors
   Rule key: blurNames
   ========================================================================== */

window.WA_BLUR_RULES.push({
  key: 'blurNames',
  className: 'wa-blur-names',
  label: "Group / User's Name",
  property: 'filter',
  blurMultiplier: 1,
  targets: [
    //  Main Chat List Sidebar
    '[data-testid="chat-list"] [data-testid="message-yourself-row"] [data-testid="cell-frame-title"]',
    '[data-testid="chat-list"] [data-testid="cell-frame-container"] [data-testid="cell-frame-title"]',
    //  Me Tab Drawer Sidebar
    '[data-testid="me-tab-drawer"] [data-testid="drawer-title-body"]',
    '[data-testid="profile-drawer"] div:has( > [data-testid="pushname-section"]) > div:nth-child(2)',
    '[data-testid="profile-drawer"] [data-testid="container_with_separator"] div:has( > [data-testid="phone"]) > div',
    //  Archived Sidebar
    '[data-testid="archived-chatlist"] [data-testid="cell-frame-container"] [data-testid="cell-frame-title"]',
    '[data-testid="archived-chatlist"] [data-testid="message-yourself-row"] [data-testid="cell-frame-title"]',
    //  Status Sidebar
    '[data-testid="status-tab-drawer"] [data-testid="status-list-drawer"] [class="statusList"] [data-testid="status-row-cell"] [data-testid="cell-frame-title"]',
    //  Status Player
    '[data-testid="status-player-uie"] [data-testid="status-player-contact-name"]',
    //  Channel Sidebar
    '[data-testid="newsletter-drawer"] [data-testid="newsletter-tab-newsletter-cell"] [data-testid="cell-frame-container"] [data-testid="cell-frame-title"]',
    '[data-testid="newsletter-drawer"] [data-testid="newsletter-recommended-item"] [data-testid="cell-frame-container"] > div > div:nth-child(2) > div:first-child',
    //  Conversation Panel - Header
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-header"] [data-testid="conversation-info-header"] > div:first-child',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-header"] [data-testid="conversation-info-header"] [data-testid="chat-subtitle"]:has(span)',
    //  Conversation Panel - Messages
    '[data-testid="conversation-panel-messages"] [data-testid="msg-container"] div:has( > span[data-testid="author"])',
    '[data-testid="conversation-panel-messages"] [data-testid="vcard-msg"] > div:nth-child(2)',
    '[data-testid="conversation-panel-messages"] [data-testid="quoted-message"] div[role="button"]:has( > [data-testid="chat-msg-symbol"] [data-testid="person-refreshed-outline-thin"])',
    //  Right Sidebar - Chat Info Drawer
    '[data-testid="chat-info-drawer"] > :nth-child(2) div:has( > div > span[class*="html-span"] img) > div:nth-child(2)',
    '[data-testid="chat-info-drawer"] [data-testid="group-info-drawer-body"] div:has( > span[data-testid="group-info-drawer-subject-input-read-only selectable-text"])',
    //  Right Sidebar - Group Participants Info
    '[data-testid="group-info-participants-section"] [id="pane-side"] [role="listitem"] [data-testid="cell-frame-container"] > div:nth-child(2) [data-testid="cell-frame-title"]',
    '[data-testid="group-info-participants-section"] [id="pane-side"] [role="listitem"] [data-testid="cell-frame-container"] > div:nth-child(2) [data-testid="cell-frame-secondary"] > div:nth-child(2)',
    //  Right Sidebar - Common Group
    'div:has([data-testid="section-common-groups"]) [data-testid="cell-frame-container"] [data-testid="cell-frame-title"]',
    'div:has([data-testid="section-common-groups"]) [data-testid="cell-frame-container"] [data-testid="cell-frame-secondary"]',
    //  Right Sidebar - Links Gallery Messages
    '[data-testid="media-gallery-drawer"] [data-list-scroll-container="true"] [data-testid="link-gallery-msg"] > div:first-child > div:first-child > span[dir="auto"]',
    //  Popup Members
    '[data-testid="popup-contents"] [data-testid="contacts-modal"] [role="listitem"] [data-testid="cell-frame-container"] [data-testid="cell-frame-title"]',
    '[data-testid="popup-contents"] [data-testid="contacts-modal"] [role="listitem"] [data-testid="cell-frame-container"] [data-testid="cell-frame-secondary"] > div:nth-child(2)',
    //  Profile Picture Overlay
    '[class*="overlay"] [data-testid="cell-frame-container"] [data-testid="cell-frame-title"]',
  ],
});
