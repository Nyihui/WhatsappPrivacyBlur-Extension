/* ==========================================================================
   WhatsApp Privacy Blur - FAB Panel Styles  (Material Design / WhatsApp theme)
   Exposes: window.WA_PANEL_STYLES
   ========================================================================== */

window.WA_PANEL_STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ---------------------------------------------------------------- TOKENS */
  :host {
    /* Dark (WhatsApp dark) — default */
    --md-bg:           #111b21;
    --md-surface:      #202c33;
    --md-surface-var:  #2a3942;
    --md-on-surface:   #e9edef;
    --md-on-s-var:     #8696a0;
    --md-outline:      rgba(255,255,255,0.09);
    --md-outline-var:  rgba(255,255,255,0.04);
    --md-primary:      #00a884;
    --md-primary-dim:  rgba(0,168,132,0.12);
    --md-error:        #f28b82;
    --md-error-dim:    rgba(242,139,130,0.12);
    --md-elev:         0 4px 16px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.25);
    --md-radius:       8px;

    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 2147483647;
    font-family: 'Roboto', system-ui, sans-serif;
  }

  /* Light (WhatsApp light) */
  :host([data-theme="light"]) {
    --md-bg:           #f0f2f5;
    --md-surface:      #ffffff;
    --md-surface-var:  #f5f6f6;
    --md-on-surface:   #111b21;
    --md-on-s-var:     #667781;
    --md-outline:      rgba(0,0,0,0.10);
    --md-outline-var:  rgba(0,0,0,0.05);
    --md-primary:      #00a884;
    --md-primary-dim:  rgba(0,168,132,0.10);
    --md-error:        #b3261e;
    --md-error-dim:    rgba(179,38,30,0.08);
    --md-elev:         0 4px 16px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
  }

  /* ----------------------------------------------------------------- PANEL */
  #wa-panel {
    pointer-events: none;
    visibility: hidden;
    position: fixed;
    width: 320px;
    max-height: 80vh;
    background: var(--md-bg);
    border: 1px solid var(--md-outline);
    border-radius: 12px;
    box-shadow: var(--md-elev);
    overflow-y: auto;
    overflow-x: hidden;
    opacity: 0;
    transform: translateY(6px) scale(0.98);
    transition:
      opacity .2s cubic-bezier(.2,0,0,1),
      transform .2s cubic-bezier(.2,0,0,1),
      visibility 0s linear .2s;
    scrollbar-width: thin;
    scrollbar-color: var(--md-outline) transparent;
  }
  #wa-panel::-webkit-scrollbar       { width: 3px; }
  #wa-panel::-webkit-scrollbar-track { background: transparent; }
  #wa-panel::-webkit-scrollbar-thumb { background: var(--md-outline); border-radius: 3px; }

  #wa-panel.open {
    pointer-events: auto;
    visibility: visible;
    opacity: 1;
    transform: none;
    transition:
      opacity .2s cubic-bezier(.2,0,0,1),
      transform .2s cubic-bezier(.2,0,0,1),
      visibility 0s linear 0s;
  }

  /* -------------------------------------------------------------- DASHBOARD */
  .dashboard {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--md-on-surface);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 8px;
  }
  .logo-area {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .logo-area svg { display: block; flex-shrink: 0; }
  .logo-text    { font-size: 14px; font-weight: 500; color: var(--md-on-surface); letter-spacing: .1px; line-height: 1; }
  .header-right { display: flex; align-items: center; gap: 6px; }
  .reset-btn {
    background: transparent; border: none; padding: 4px; border-radius: 4px;
    color: var(--md-on-s-var); cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background .15s, color .15s; margin-right: 2px;
  }
  .reset-btn:hover { background: rgba(0, 168, 132, 0.1); color: var(--md-primary); }
  .reset-btn:active { background: rgba(0, 168, 132, 0.2); }
  .logo-version { font-size: 12px; color: var(--md-on-s-var); line-height: 1; flex-shrink: 0; }

  /* -----------------------------------------------------------------  CARDS */
  .card {
    background: var(--md-surface);
    border: 1px solid var(--md-outline);
    border-radius: var(--md-radius);
    overflow: hidden;
  }

  /* Master toggle card */
  .master-group { display: flex; flex-direction: column; }
  .master-group .master-card { border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: none; }

  .master-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 12px;
    background: var(--md-primary-dim);
  }
  .dashboard.shield-off .master-card { background: var(--md-error-dim); }
  .master-label { font-size: 14px; font-weight: 500; }

  /* Shortcut badge */
  .shortcut-badge {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--md-surface);
    border: 1px solid var(--md-outline);
    border-top: none;
    border-bottom-left-radius: var(--md-radius);
    border-bottom-right-radius: var(--md-radius);
    padding: 5px 12px;
    font-size: 10px;
    color: var(--md-on-s-var);
  }
  .shortcut-left { display: flex; align-items: center; gap: 8px; }
  .shortcut-left svg { color: var(--md-on-s-var); }
  .keybind {
    color: var(--md-on-s-var);
    background: var(--md-surface-var);
    border: 1px solid var(--md-outline);
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .3px;
  }

  /* Blur intensity slider card */
  .slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px 2px;
  }
  .slider-title {
    font-size: 10px; font-weight: 500; text-transform: uppercase;
    letter-spacing: .8px; color: var(--md-on-s-var);
  }
  .slider-val {
    font-size: 11px; font-weight: 500; color: var(--md-primary);
    background: var(--md-primary-dim);
    padding: 2px 8px; border-radius: 4px; min-width: 32px; text-align: center;
  }

  /* Section card */
  .section-title {
    font-size: 10px; font-weight: 500; text-transform: uppercase;
    letter-spacing: .8px; color: var(--md-on-s-var);
    padding: 7px 12px 5px;
    border-bottom: 1px solid var(--md-outline-var);
  }

  .control-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    border-bottom: 1px solid var(--md-outline-var);
    transition: background .15s;
  }
  .control-row:last-child { border-bottom: none; }
  .control-row:hover { background: rgba(0,168,132,0.05); }

  .row-left { display: flex; align-items: center; gap: 8px; }
  .icon-box {
    display: flex; align-items: center; justify-content: center;
    width: 22px; height: 22px; border-radius: 50%;
    color: var(--md-on-s-var);
    flex-shrink: 0;
    transition: color .15s;
  }
  .control-row:hover .icon-box { color: var(--md-primary); }

  .row-text { display: flex; flex-direction: column; gap: 1px; }
  .row-title { font-size: 12px; font-weight: 400; color: var(--md-on-surface); line-height: 1.2; }
  .row-desc  { font-size: 10px; color: var(--md-on-s-var); line-height: 1.2; }

  /* -------------------------------------------------------- MATERIAL SWITCH */
  .switch { position: relative; display: inline-block; width: 36px; height: 20px; flex-shrink: 0; }
  .switch input { opacity: 0; width: 0; height: 0; }

  .slider {
    position: absolute; cursor: pointer; inset: 0;
    background: var(--md-surface-var);
    border: 2px solid var(--md-on-s-var);
    transition: .2s cubic-bezier(.2,0,0,1);
  }
  .slider::before {
    position: absolute; content: "";
    width: 10px; height: 10px; left: 3px; bottom: 3px;
    background: var(--md-on-s-var);
    transition: .2s cubic-bezier(.2,0,0,1);
  }
  input:checked + .slider { background: var(--md-primary); border-color: var(--md-primary); }
  input:checked + .slider::before {
    transform: translateX(16px);
    background: #ffffff;
    width: 14px; height: 14px; left: 1px; bottom: 1px;
  }
  .slider.round                { border-radius: 34px; }
  .slider.round::before        { border-radius: 50%; }
  .master-switch input:checked + .slider { box-shadow: 0 0 0 3px var(--md-primary-dim); }
  .master-switch input:not(:checked) + .slider { background: var(--md-surface-var); border-color: var(--md-error); }
  .master-switch input:not(:checked) + .slider::before { background: var(--md-error); }

  /* ---------------------------------------------------------- RANGE SLIDER */
  .range-slider {
    -webkit-appearance: none;
    width: calc(100% - 24px); height: 4px; border-radius: 2px;
    background: var(--md-outline);
    outline: none; margin: 6px 12px 10px;
    display: block;
  }
  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 12px; height: 12px;
    border-radius: 50%; background: var(--md-primary); border: none; cursor: pointer;
    box-shadow: 0 0 0 6px var(--md-primary-dim);
    transition: transform .1s;
  }
  .range-slider::-moz-range-thumb {
    width: 12px; height: 12px; border-radius: 50%; background: var(--md-primary);
    border: none; cursor: pointer;
    box-shadow: 0 0 0 6px var(--md-primary-dim);
  }
  .range-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
  .range-slider::-moz-range-thumb:hover     { transform: scale(1.15); }

  /* ----------------------------------------------------- SUB SLIDER (input) */
  .control-row--expandable { flex-direction: column; align-items: stretch; }
  .control-row--expandable .row-main {
    display: flex; justify-content: space-between; align-items: center; width: 100%;
  }
  .sub-slider { margin-top: 6px; padding: 6px 0 0; border-top: 1px solid var(--md-outline-var); }
  .sub-slider-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
  .sub-slider-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: .8px; color: var(--md-on-s-var); }
  .sub-slider-val {
    font-size: 11px; font-weight: 500; color: var(--md-primary);
    background: var(--md-primary-dim);
    padding: 2px 8px; border-radius: 4px; min-width: 32px; text-align: center;
  }
  .sub-range-slider { margin: 4px 0 2px; width: 100%; }

  /* ---------------------------------------------------- SHIELD-OFF DIM STATE */
  .dashboard.shield-off .icon-box,
  .dashboard.shield-off .row-title,
  .dashboard.shield-off .row-desc,
  .dashboard.shield-off .slider-title,
  .dashboard.shield-off .slider-val { opacity: .4; }
  .dashboard.shield-off .range-slider { opacity: .4; }
  .dashboard.shield-off .range-slider::-webkit-slider-thumb { cursor: not-allowed; }
  .dashboard.shield-off .range-slider::-moz-range-thumb     { cursor: not-allowed; }
  .dashboard.shield-off .row-switch input:checked + .slider { opacity: .4; cursor: not-allowed; }
  .dashboard.shield-off .row-switch .slider                 { cursor: not-allowed; }
`;
