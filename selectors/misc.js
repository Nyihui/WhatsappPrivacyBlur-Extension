/* ==========================================================================
   WhatsApp Privacy Blur - Sticker + Transition Selectors
   Rule keys: blurStickers, noTransition
   ========================================================================== */

window.WA_BLUR_RULES.push(
  {
    key: 'blurStickers',
    className: 'wa-blur-stickers',
    label: 'Stickers',
    property: 'filter',
    blurMultiplier: 2,
    targets: [
      //  Conversation Panel
      '[data-testid="conversation-panel-messages"] [data-testid="msg-container"] div:has( > span[data-testid="sticker-container"])',
      '[data-testid="conversation-panel-messages"] [data-id*="grouped-sticker"] div:has( > span[data-testid="sticker-container"])',
      //  Expression Panel
      '[data-testid="expressions-panel"] [data-testid="sticker-item"]:has([data-testid="sticker-container"] img)',
      '[data-testid="expressions-panel"] [data-testid="sticker-item"]:has([data-testid="sticker-container"] svg)',
      'div:has([class*="html-div"]) [class*="x-default-marker"] [data-testid="sticker-item"]:has([data-testid="sticker-container"] img)',
    ],
  },
  {
    key: 'noTransition',
    className: 'wa-no-transition',
    label: 'No Transition Delay',
    special: 'noTransition',
  }
);
