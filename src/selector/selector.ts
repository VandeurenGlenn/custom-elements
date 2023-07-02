import SelectorMixin from '../mixins/selector-mixin.js'

export class CustomSelector extends SelectorMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }

        ::slotted(.custom-selected:not([non-interactive])) {
          
          background: var(--md-sys-color-secondary-container);
          color: var(--md-sys-color-on-secondary-container);
        }

        ::slotted(*) {
          color: var(--md-sys-color-on-surface-variant);
          font-family: var(--md-sys-typescale-label-large-font-family-name);
          font-style: var(--md-sys-typescale-label-large-font-family-style);
          font-weight: var(--md-sys-typescale-label-large-font-weight);
          font-size: var(--md-sys-typescale-label-large-font-size);
          letter-spacing: var(--md-sys-typescale-label-large-tracking);
          line-height: var(--md-sys-typescale-label-large-height);
          text-transform: var(--md-sys-typescale-label-large-text-transform);
          text-decoration: var(--md-sys-typescale-label-large-text-decoration);
        }

        ::slotted(:not(.custom-selected):not([non-interactive]):hover) {
          background: var(--md-sys-color-secondary-container-hover);
          color: var(--md-sys-color-on-secondary-container);
        }
      </style>
      <slot></slot>
    `;
  }
}
// @ts-ignore
customElements.define('custom-selector', CustomSelector)