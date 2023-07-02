import SelectorMixin from '../mixins/selector-mixin.js'

export class CustomSelector extends SelectorMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = `
      <style>
        ::slotted(.custom-selected) {
          background: #000;
          color: #fff;
        }
      </style>
      <slot></slot>
    `;
  }
}
// @ts-ignore
customElements.define('custom-selector', CustomSelector)