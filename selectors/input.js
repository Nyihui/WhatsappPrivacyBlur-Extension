/* ==========================================================================
   WhatsApp Privacy Blur - Text Input Selectors
   Rule key: blurInput
   ========================================================================== */

window.WA_BLUR_RULES.push({
  key: 'blurInput',
  className: 'wa-blur-input',
  label: 'Text Input',
  property: 'opacity',
  targets: [
    'div:has( > div[class*="lexical-rich-text-input"])',
  ],
});
