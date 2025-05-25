import { css } from '@vandeurenglenn/lite'
export default css`
  :host {
    --custom-button-border-radius: var(--md-sys-shape-corner-large);
    --custom-button-font-family: var(--md-sys-typescale-label-large-font-family);
    color: var(--custom-button-color, --md-sys-color-on-background);
    display: flex;
    height: 40px;
    border-radius: var(--custom-button-border-radius);

    position: relative;
    pointer-events: auto;
    cursor: pointer;
    overflow: hidden;

    --elevation-level: 0;
  }

  button {
    box-sizing: border-box;
    border: none;
    background: transparent;
    color: inherit;
    align-items: center;
    justify-content: center;
    user-select: none;
    outline: none;
    cursor: pointer;
    border-radius: inherit;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    pointer-events: none;
    font-size: inherit;
    font-family: var(--custom-button-font-family);
    font-style: var(--md-sys-typescale-label-large-font-family-style);
    font-weight: var(--md-sys-typescale-label-large-font-weight);
    font-size: var(--md-sys-typescale-label-large-font-size);
    letter-spacing: var(--md-sys-typescale-label-large-tracking);
    line-height: var(--md-sys-typescale-label-large-height);
    text-transform: var(--md-sys-typescale-label-large-text-transform);
    text-decoration: var(--md-sys-typescale-label-large-text-decoration);
  }

  :host([type='filled']) {
    background: var(--md-sys-color-primary);
  }

  :host([type='filled']),
  :host([type='filled']) ::slotted(*) {
    color: var(--md-sys-color-on-primary);
    fill: var(--md-sys-color-on-primary);
  }

  :host([type='outlined']) {
    border: solid 1px;
    border-color: var(--md-sys-color-outline);
    background: var(--md-sys-color-surface);
  }

  :host([type='outlined']),
  :host([type='outlined']) ::slotted(*) {
    color: var(--md-sys-color-on-surface);
    fill: var(--md-sys-color-on-surface);
  }

  :host([type='elevated']) {
    background: var(--md-sys-color-surface-container-low);
  }

  :host([type='elevated']),
  :host([type='elevated']) ::slotted(*) {
    color: var(--md-sys-color-primary);
    fill: var(--md-sys-color-primary);
  }

  :host([type='tertiary']) {
    background: var(--md-sys-color-tertiary);
  }

  :host([type='tertiary']),
  :host([type='tertiary']) ::slotted(*) {
    color: var(--md-sys-color-on-tertiary);
    fill: var(--md-sys-color-on-tertiary);
  }

  :host([type='tonal']) {
    background: var(--md-sys-color-secondary-container);
  }

  :host([type='tonal']),
  :host([type='tonal']) ::slotted(*) {
    color: var(--md-sys-color-on-secondary-container);
    fill: var(--md-sys-color-on-secondary-container);
  }

  custom-elevation {
    --md-elevation-level: var(--elevation-level);
  }

  :host([type='elevated']) custom-elevation {
    --elevation-level: 1;
  }

  :host([type='filled']),
  :host([type='outlined']),
  :host([type='text']),
  :host([type='tonal']) {
    --elevation-level: 0;
  }

  :host([has-label]) .label {
    padding-left: 24px;
    padding-right: 24px;
    align-items: center;
    display: flex;
    justify-content: center;
    flex: 1;
    text-align: center;
  }

  :host([has-icon]:not([has-label])) {
    border-radius: 50%;
    width: 40px;
    align-items: center;
    justify-content: center;
  }

  :host([has-icon][has-label]) .label {
    padding-left: 8px;
    padding-right: 24px;
    text-align: end;
  }
  :host([has-icon][has-label]) slot[name='icon']::slotted(*) {
    padding-left: 16px;
  }

  :host([disabled]) .label,
  :host([disabled]) slot[name='icon']::slotted(*) {
    opacity: 0.28;
  }
  .label {
    font-size: inherit;
  }

  ::slotted(*) {
    pointer-events: none;
  }

  :host([type='elevated']:focus),
  :host([type='elevated']:hover) {
    --elevation-level: 2;
  }

  :host(:active) {
    --elevation-level: 0;
  }

  button * {
    pointer-events: none;
  }
  .hover {
    position: absolute;
    inset: 0;
    background-color: var(--md-sys-color-primary);
    opacity: 0;
    transition: opacity 200ms;
    border-radius: var(--custom-button-border-radius);
  }

  :host(:focus) .hover,
  :host(:hover) .hover {
    opacity: 0.1;
  }

  :host(:active) .hover {
    opacity: 0.2;
  }

  :host([type='filled']:focus) .hover,
  :host([type='filled']:hover) .hover {
    background-color: var(--md-sys-color-on-primary);
    opacity: 0.1;
  }

  :host([type='filled']:active) .hover {
    opacity: 0.2;
  }

  :host([type='tertiary']:focus) .hover,
  :host([type='tertiary']:hover) .hover {
    background-color: var(--md-sys-color-on-tertiary);
    opacity: 0.1;
  }

  :host([type='tertiary']:active) .hover {
    opacity: 0.2;
  }

  :host([type='tonal']:focus) .hover,
  :host([type='tonal']:hover) .hover {
    background-color: var(--md-sys-color-on-secondary-container);
    opacity: 0.1;
  }

  :host([type='tonal']:active) .hover {
    opacity: 0.2;
  }
`
