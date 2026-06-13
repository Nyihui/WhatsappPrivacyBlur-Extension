/* ==========================================================================
   WhatsApp Privacy Blur - FAB Panel HTML Template
   Exposes: window.WA_PANEL_SHIELD_SVG, window.WA_PANEL_HTML
   Loaded before fab/fab.js via manifest.json
   ========================================================================== */

window.WA_PANEL_SHIELD_SVG = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUESURBVFhH7VdZTJxVFL4Povjmo29uNbak9kFNjDGx0QcTTBN9aKKxIZZETWw0JtoSbSkgZWhZB2bYKZSlC5S9VGWprbShttOFllIECi1Fa0uBylaWsnx+5/7/2GH4QQhj4oM3+TIz/z33fN8959zz31H/j3kjKXydyohLU2l7XMppayIu+gBNKp3+MmPTVULoiyaTxUiM2KSy4idVgRNqbwJUtg8h/sRvdtyEske8bzJ6jCTbWpURO0MBUM5oqJR/AeI3m/7TY6aVw7baZDaH05ajFS6H3BEFlRBmfFrNW0H8FwpPVJrJbA7JlYTJapE3hDA+FI+nx2JDdTH802P07yULyUmkANtZk9kczuimBQWI46RIY7dCnLobm2sq0DPQDxnd/X346Mdy+KfSVoSIndgvJMjgOWcym2OhCCTv4k5j8EyeE+8dKUL2JRcGhoaAB1PYe+kcXjuQidzL54CpKfQPDSKr6SzerTqEp2mvI8P183wKj9PmMpnNYSUgMRzbT9XjLglnxicwS7T13kbULz/jORKohJ3aRj5X5aXAxuftnBdbQS8FhZysM2w8/S5HQEN3J5pv30JgaQGe2kdS2VE8iSXEnrbyW8KfHKntAssKcJVijnVdW4EAeziO3+hE4ZUmqOgQ7Zx2D+flu+TZ/cweYdgIdoeguPUy6ro6Vibgp+vXcLi12Sgs9/Ok74wokNifJ0GLiN2OSKZg15kGMy1hqGhvQW1nuw8FyE5JHFCYhvQmFzru3tE5P8k0VXe0om9wEOv2ZxgCE30hgAvnCCA+O1aN8YkJYHISW+qrEZCbjAu3ejA+Po71pfkILC80BPgqAscpoIi5VHu+wSf1R4DpGY0PfiiDCvscXzXU4PfBP/HyoWwc/rVZ94Xg2iptX04BdSuNQD2LqOgqBTCkPQN9+vzfHxnBE3xnbGuoxSSP2xoewScZCUw+0PNdfb2MwE6UtV1BTWfbCgTQyaHWSzrHKuZbbK6rZMOZxv3RUZzg6ejjzp8nuQr/wojOzKye38SuKEXZePM6Cq5c1H7m+F2yABbcNjaSATYUP7ZfFReKILZg2eXQyCjeYM5fyk/FVkZCng2PjSGY8ypuBx5N24PB4SF8eaLGODGefpcsgMW09mCW3tWbUlzsBVuOf497w8MIIPHXJL55bwCtd/6A/fxpdkOzOxJvVx7Q61a7T4Wn3yULSOGxY3Nx/dbNjtil07DxaAleKcohSRgeY6/34051H9DdUYi4hnOne27oFOjmNMcnsXQBBAvo9ZI8Xd1BtZVQtq0GkaTEuxMKmPvguipt/2px7vwCFCxLgIC7i3GdAmZnsb4knyQ7LOwoguRv8R0A1mKUdETv3LuxbAFO7pKhPMh+IJX+ofQAFuTfubXzky+iIFa/zOe38N3BHqLXefsSLFuAXDQcfAtSRML5Rh3eIjadZ3n2hXjVPgdK21r081hGSudd7K18CawFLHIjEmgRRrFtYIVL9c+wJZ9hcWJiEt28Hb1Tsd8Iu9hZ+XDD4PG6EaXYLiwqwBOscj/m/NNjR3G0qx0f8/3wiBQin1vaeyPHKgIOW7a+rVot8IZEQ/IrhG78067dcN+Kk6MyTGZzJIcH6Pu63NutFvoCD/8XTCl75Asms8eQfyxZceNaoVydJSU+A/2J36y4MfaGjSajxbCHrlGZMQ6qbNR5ckYtDscSIH7SdjfSp0P7/+8Mpf4CCJuFEbUMrGgAAAAASUVORK5CYII=" width="22" height="22" alt="Privacy Blur Logo">`;

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
      <span class="logo-text">Privacy Blur</span>
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
