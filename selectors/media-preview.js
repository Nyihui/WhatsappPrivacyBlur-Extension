/* ==========================================================================
   WhatsApp Privacy Blur - Media Preview Selectors
   Rule key: blurMediaPreview
   ========================================================================== */

window.WA_BLUR_RULES.push({
  key: 'blurMediaPreview',
  className: 'wa-blur-media-preview',
  label: 'Media Preview',
  property: 'filter',
  blurMultiplier: 1,
  targets: [
    //  Conversation Panel
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-body"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] [data-testid="image-thumb"] [data-testid="media-url-provider"]',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-body"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] [data-testid="link-preview-container"]',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-body"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] [data-testid="document-thumb"]',
    '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-body"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] [data-testid="quoted-message"] > div > div:last-child div:has([style*="background-image: url"])',
    //  Right Sidebar
    '[data-testid="chat-info-drawer"] [data-testid="group-info-drawer-body"] [data-testid="media-gallery"] > [data-testid="media-canvas"]',
    '[data-testid="media-gallery-drawer"] [data-list-scroll-container="true"] [data-testid="media-gallery"] > [data-testid="media-canvas"]',
    '[data-testid="media-gallery-drawer"] [data-list-scroll-container="true"] [data-testid="doc-gallery"] [data-testid="msg-container"]',
    '[data-testid="media-gallery-drawer"] [data-list-scroll-container="true"] [data-testid="link-gallery-msg"] [data-testid="msg-container"]',
    '[data-testid="media-gallery-drawer"] [data-list-scroll-container="true"] [data-testid="link-gallery-msg"] [data-testid="link-msg"]',
    //  Media List on Fullscreen View
    '[role="list"] [data-testid="media-canvas"] [data-testid="media-url-provider"] [data-testid="media-canvas-img"]',
    '[role="list"] [role="listitem"] [role="tab"] div:has( > img)',
    //  Media Hub Dialog
    '[data-testid="media-hub-modal"] [data-testid="popup-contents"] [data-testid="media-hub-thumb"]',
    '[data-testid="media-hub-modal"] [data-testid="popup-contents"] [data-focusid="media-hub-row-item"]',
  ],
  // Blur a child element but reveal it when hovering the PARENT.
  hoverParentTargets: [
    {
      hoverParent: '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-body"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] [data-testid="image-thumb-gif"]',
      child: '> div:has(video)',
    },
    {
      hoverParent: '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-body"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] [data-testid="video-content"]',
      child: '> div[style*="background-image: url"]',
    },
    {
      hoverParent: '[data-testid="conversation-panel-wrapper"] [data-testid="conversation-panel-body"] [data-testid="conversation-panel-messages"] [data-testid="msg-container"] [data-testid="image-thumb"]',
      child: '> img',
    },
    {
      hoverParent: '[role="list"] [data-testid="media-canvas"] > div',
      child: '> button > div[style*="background-image: url"]',
    },
  ],
});
