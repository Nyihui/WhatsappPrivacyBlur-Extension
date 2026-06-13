/* ==========================================================================
   WhatsApp Privacy Blur - Message Preview Selectors
   Rule key: blurPreviews
   ========================================================================== */

window.WA_BLUR_RULES.push({
  key: 'blurPreviews',
  className: 'wa-blur-previews',
  label: 'Last Message Preview',
  property: 'filter',
  blurMultiplier: 1,
  targets: [
    '[data-testid="chat-list"] [data-testid="cell-frame-container"] div[data-testid="cell-frame-secondary"] > div:first-child',
    '[data-testid="chat-list"] [data-testid="message-yourself-row"] div[data-testid="cell-frame-secondary"] > div:first-child',
    '[data-testid="archived-chatlist"] [data-testid="cell-frame-container"] div[data-testid="cell-frame-secondary"] > div:first-child',
    '[data-testid="archived-chatlist"] [data-testid="message-yourself-row"] div[data-testid="cell-frame-secondary"] > div:first-child',
    '[data-testid="newsletter-drawer"] [data-testid="newsletter-tab-newsletter-cell"] [data-testid="cell-frame-secondary"]:has([data-testid="last-msg-status"]) > div:first-child',
  ],
});
