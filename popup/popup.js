// Apply the theme WhatsApp is currently using (stored by the content script)
chrome.storage.local.get({ waTheme: null }, (s) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = s.waTheme === 'dark' || (s.waTheme === null && prefersDark);
  if (!isDark) document.documentElement.classList.add('light');
});
