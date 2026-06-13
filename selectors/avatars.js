/* ==========================================================================
   WhatsApp Privacy Blur - Avatar Selectors
   Rule key: blurAvatars
   ========================================================================== */

window.WA_BLUR_RULES.push(
  {
    key: 'blurAvatars',
    className: 'wa-blur-avatars',
    label: 'Profile Pictures',
    property: 'filter',
    blurMultiplier: 1,
    targets: [
      //  Main Chat List Sidebar
      'button:has([data-testid="navbar-item-me-tab-photo"])',
      '[data-testid="chat-list"] [data-testid="message-yourself-row"] > div:first-child img',
      '[data-testid="chat-list"] [data-testid="cell-frame-container"] > div:first-child img',
      '[data-testid="chat-list"] [data-testid="cell-frame-container"] > div:first-child [data-testid="default-contact-refreshed"]',
      '[data-testid="chat-list"] [data-testid="cell-frame-container"] > div:first-child [data-testid="default-group-refreshed"]',
      //  Recent Search
      'div:has([data-testid="chatlist-header"]) div:has( > [data-testid="chat-list-search-container"]) [data-testid="recent-search-item"] > div:first-child',
      //  Me Tab Drawer Sidebar
      '[data-testid="me-tab-drawer"] [data-testid="menu-controller-focus-receiver"] img',
      '[data-testid="profile-drawer"] img',
      //  Archived Sidebar
      '[data-testid="archived-chatlist"] [data-testid="cell-frame-container"] > div:first-child img',
      '[data-testid="archived-chatlist"] [data-testid="cell-frame-container"] [data-testid="default-contact-refreshed"]',
      '[data-testid="archived-chatlist"] [data-testid="cell-frame-container"] [data-testid="default-group-refreshed"]',
      //  Status Sidebar
      '[data-testid="status-tab-drawer"] [data-testid="status-list-drawer"] [class="statusList"] [data-testid="status-row-cell"] [data-testid="status-thumbnail"] > div:has(img)',
      '[data-testid="status-tab-drawer"] [data-testid="status-list-drawer"] [class="statusList"] [data-testid="status-row-cell"] [data-testid="status-thumbnail"] > div:has( > div[style*="background-image: url"])',
      '[data-testid="status-tab-drawer"] [data-testid="status-header-add-status"] img',
      //  Status Player
      '[data-testid="status-player-uie"] img[src*="https"]:not([data-testid="sticker-item"] *, [data-testid="status-emoji-bar"] *)',
      //  Channel Sidebar
      '[data-testid="newsletter-drawer"] [data-testid="newsletter-tab-newsletter-cell"] [data-testid="cell-frame-container"] > div:first-child img',
      '[data-testid="newsletter-drawer"] [data-testid="newsletter-recommended-item"] [data-testid="cell-frame-container"] > div > div:first-child img',
      //  Conversation Panel - Header
      '[data-testid="conversation-header"] img:not([data-testid="conversation-info-header"] *)',
      '[data-testid="conversation-header"] [data-testid="default-contact-refreshed"]',
      '[data-testid="conversation-header"] [data-testid="default-group-refreshed"]',
      //  Conversation Panel - Messages
      '[data-testid="conversation-panel-messages"] [data-testid="group-chat-profile-picture"]',
      '[data-testid="conversation-panel-messages"] [data-testid="vcard-msg"] img',
      '[data-testid="conversation-panel-messages"] [data-testid="quoted-message"]:has([data-testid="chat-msg-symbol"]) img',
      '[data-testid="conversation-panel-messages"] [data-testid="msg-container"] div:has( > div > div > div > [data-testid="ptt-status"]) > div:first-child',
      //  Right Sidebar - Chat Info Drawer
      '[data-testid="chat-info-drawer"] > :nth-child(2) [class*="html-span"]:has(img)',
      '[data-testid="chat-info-drawer"] [data-testid="group-info-drawer-body"] div:has( > button[data-testid="group-pic-picker"])',
      '[data-testid="chat-info-drawer"] [data-testid="group-info-drawer-body"] span:has( > button[data-testid="group-pic-picker"])',
      '[data-testid="chat-info-drawer"] span[class*="html-span"] [data-testid="default-contact-refreshed"]',
      //  Right Sidebar - Group Participants Info
      '[data-testid="group-info-participants-section"] [id="pane-side"] [role="listitem"] [data-testid="cell-frame-container"] > div:first-child img',
      '[data-testid="group-info-participants-section"] [id="pane-side"] [role="listitem"] [data-testid="cell-frame-container"] [data-icon="default-contact-refreshed"]',
      //  Right Sidebar - Common Group
      'div:has([data-testid="section-common-groups"]) [data-testid="cell-frame-container"] > div:first-child img',
      //  Media Viewer
      '[data-testid="media-viewer-modal"] [data-testid="cell-frame-container"] img',
      '[data-testid="media-viewer-modal"] [data-testid="cell-frame-container"] [data-testid="default-contact-refreshed"]',
      //  Popup Members
      '[data-testid="popup-contents"] [data-testid="contacts-modal"] [role="listitem"] img',
      '[data-testid="popup-contents"] [data-testid="contacts-modal"] [role="listitem"] [data-testid="default-contact-refreshed"]',
      //  Profile Picture Overlay
      '[class*="overlay"] [data-testid="cell-frame-container"] img',
    ],
  },
  {
    key: 'blurAvatars',
    className: 'wa-blur-avatars',
    label: 'Profile Pictures',
    property: 'filter',
    blurMultiplier: 5,
    targets: [
      '[class*="overlay"] [dir="ltr"] div:has( > img)',
      '[class*="overlay"] [dir="rtl"] div:has( > img)',
    ],
  }
);
