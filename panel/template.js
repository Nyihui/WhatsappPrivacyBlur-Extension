/* ==========================================================================
   WhatsApp Privacy Blur - FAB Panel HTML Template
   Exposes: window.WA_PANEL_SHIELD_SVG, window.WA_PANEL_HTML
   Loaded before fab/fab.js via manifest.json
   ========================================================================== */

window.WA_PANEL_SHIELD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22" preserveAspectRatio="xMidYMid meet"><defs><mask id="wa-panel-header-mask" style="mask-type: alpha"><image width="512" height="512" href="data:image/png;base64,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"/></mask></defs><rect width="512" height="512" fill="currentColor" mask="url(#wa-panel-header-mask)"/></svg>`;

/* --------------------------------------------------------------------------
   Helper: build one toggle row
   <span class="row-desc">${desc}</span>
-------------------------------------------------------------------------- */
function _fabRow(id, title, desc, svgPath) {
  return `<div class="control-row">
    <div class="row-left">
      <div class="icon-box">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${svgPath}
        </svg>
      </div>
      <div class="row-text">
        <span class="row-title">${title}</span>
      </div>
    </div>
    <label class="switch row-switch">
      <input type="checkbox" id="${id}">
      <span class="slider round"></span>
    </label>
  </div>`;
}

window.WA_PANEL_HTML = `<div class="dashboard" id="wa-dashboard">

  <header class="header">
    <div class="logo-area">
      ${window.WA_PANEL_SHIELD_SVG}
      <span class="logo-text">WhatsApp Privacy Blur</span>
      <button class="reset-btn" id="fab-reset-btn" title="Reset all settings to default">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none"
          stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
      </button>
    </div>
    <div class="header-right">
      <span class="logo-version" id="fab-version"></span>
    </div>
  </header>

  <div class="master-group">
    <div class="card master-card">
      <span class="master-label">Status</span>
      <label class="switch master-switch">
        <input type="checkbox" id="fab-enabled">
        <span class="slider round"></span>
      </label>
    </div>
    <div class="shortcut-badge barnacle-badge">
      <div class="shortcut-left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <line x1="6" y1="8" x2="6.01" y2="8"/><line x1="10" y1="8" x2="10.01" y2="8"/>
          <line x1="14" y1="8" x2="14.01" y2="8"/><line x1="18" y1="8" x2="18.01" y2="8"/>
          <line x1="6" y1="12" x2="6.01" y2="12"/><line x1="18" y1="12" x2="18.01" y2="12"/>
          <rect x="7" y="15" width="10" height="2" rx="0.5"/><line x1="10" y1="12" x2="14" y2="12"/>
        </svg>
        <span class="shortcut-text">Quick Toggle</span>
      </div>
      <kbd class="keybind">Alt + /</kbd>
    </div>
  </div>

  <div class="card slider-card">
    <div class="slider-header">
      <span class="slider-title">Blur Intensity</span>
      <span class="slider-val" id="fab-blur-val">3px</span>
    </div>
    <input type="range" id="fab-blur-intensity" min="2" max="20" value="3" class="range-slider">
  </div>

  <div class="card section-card">
    <div class="section-title">Blur Targets</div>

    ${_fabRow('fab-toggle-avatars', 'Profile Pictures', 'Avatars, status, contact photos',
  '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>')}

    ${_fabRow('fab-toggle-names', 'Names &amp; Group Titles', 'Contact names, numbers, author labels',
    '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/>')}

    ${_fabRow('fab-toggle-previews', 'Message Previews', 'Last message in chat sidebar',
      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>')}

    ${_fabRow('fab-toggle-text-chats', 'Message Texts & Descriptions', 'Text bubbles, captions, system notes',
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/>')}

    <div class="control-row control-row--expandable">
      <div class="row-main">
        <div class="row-left">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div class="row-text">
            <span class="row-title">Unblur Recent Messages</span>
            <!-- <span class="row-desc">Instantly read new messages</span> -->
          </div>
        </div>
        <label class="switch row-switch">
          <input type="checkbox" id="fab-toggle-unblur-last-n">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="sub-slider" id="fab-unblur-last-n-panel" style="display:none">
        <div class="sub-slider-header">
          <span class="sub-slider-label">Last N Messages</span>
          <span class="sub-slider-val" id="fab-unblur-last-n-val">3</span>
        </div>
        <input type="range" id="fab-unblur-last-n-slider" min="1" max="50" value="3"
          class="range-slider sub-range-slider">
      </div>
    </div>

    ${_fabRow('fab-toggle-stickers', 'Stickers', 'Sticker bubbles in chat',
          '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>')}

    ${_fabRow('fab-toggle-media-preview', 'Media Preview', 'Images, videos, docs, link previews',
            '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>')}

    ${_fabRow('fab-toggle-media-gallery', 'Media Gallery', 'Full-screen viewer &amp; gallery canvas',
              '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>')}

    <div class="control-row control-row--expandable">
      <div class="row-main">
        <div class="row-left">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/>
            </svg>
          </div>
          <div class="row-text">
            <span class="row-title">Text Input</span>
            <!-- <span class="row-desc">Dims the compose box when idle</span> -->
          </div>
        </div>
        <label class="switch row-switch">
          <input type="checkbox" id="fab-toggle-input">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="sub-slider" id="fab-input-opacity-panel" style="display:none">
        <div class="sub-slider-header">
          <span class="sub-slider-label">Opacity</span>
          <span class="sub-slider-val" id="fab-input-opacity-val">30%</span>
        </div>
        <input type="range" id="fab-input-opacity-slider" min="5" max="95" value="30"
          class="range-slider sub-range-slider">
      </div>
    </div>

    ${_fabRow('fab-toggle-no-transition', 'No Transition Delay', 'Instant blur, no fade animation',
                '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>')}

  </div>

</div>`;
