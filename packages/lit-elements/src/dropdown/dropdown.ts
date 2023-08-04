import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('custom-dropdown')
export class CustomDropdown extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean

  @property({ type: Boolean })
  shown: boolean

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('shown')) this.shown ? this.show() : this.hide()
  }

  static styles = [
    css`
      :host {
        position: absolute;
        pointer-events: none;
        opacity: 0;
        flex: 1;
        width: fit-content;
        display: flex;
        flex-direction: column;
        border: 1px;
        background: var(--md-sys-color-surface);
        z-index: 1001;
        transform: scale(0, 0);
        transform-origin: top left;
        transition: var(--md-sys-motion-easing-emphasized-accelerate) 200ms opacity, var(--md-sys-motion-easing-emphasized-accelerate) 200ms transform;
      }

      :host([open]) {
        pointer-events: auto;
        opacity: 1;
        transform: scale(1, 1);
        transition: var(--md-sys-motion-easing-emphasized-decelerate) 500ms opacity, var(--md-sys-motion-easing-emphasized-decelerate) 500ms transform;
      }
    `
  ];

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  render() {
    return html`
    <slot></slot>
    `;
  }
}
