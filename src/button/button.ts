import { customElement } from 'custom-element-decorator'
import '../elevation/elevation.js'
import { LitElement, html } from 'lit'

@customElement()
export class CustomButton extends LitElement {
  label: string
  hasIcon: boolean
  hasLabel: boolean
  type: 'elevated' | 'filled' | 'text' | 'outlined' = 'text'

  static properties = {
    label: { type: String },
    hasIcon: { type: Boolean, reflect: true, attribute: 'has-icon' },
    hasLabel: { type: Boolean, reflect: true, attribute: 'has-label' }
  }

  async connectedCallback() {
    const slots = Array.from(this.querySelectorAll('slot'))
    for (const slot of slots) {
      slot.addEventListener('slotchange', this.#slotchange)
    }
    super.connectedCallback();
    await this.updateComplete
    this.#updateAttributes()
  }

  #updateAttributes() {
    const iconSlot = this.shadowRoot.querySelector('slot[name="icon"]')
    // @ts-ignore
    this.hasIcon = (Array.from(iconSlot?.assignedNodes() || [])).length !== 0
    this.hasLabel = Boolean(this.label?.length > 0)
  }

  #slotchange = () => this.#updateAttributes()

  render() {
    return html`
    <style>
      :host {
        display: contents;
        color: var(--md-sys-color-on-background);
      }

      button {
        display: inline-flex;
        height: 40px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 20px;
        position: relative;
        background: transparent;
        color: inherit;
        align-items: center;
        justify-content: center;
        border: none;
        user-select: none;
        outline: none;
      }

      .label {
        font-family: var(--md-sys-typescale-label-large-font-family-name);
        font-size: var(--md-sys-typescale-label-large-font-size);
        line-height: var(--md-sys-typescale-label-large-line-height);
        letter-spacing: var(--md-sys-typescale-label-large-letter-spacing);
      }

      :host([type="filled"]) button {
        color: var(--md-sys-color-on-primary);
        background: var(--md-sys-color-primary);
      }

      :host([type="outlined"]) button {
        color: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface);
        border: solid 1px;
        border-color: var(--md-sys-color-outline);
      }

      :host([type="elevated"]) button {
        color: var(--md-sys-color-on-secondary-container);
        background: var(--md-sys-color-secondary-container);
      }

      :host([type="tertiary"]) button {
        background: var(--md-sys-color-tertiary);
        color: var(--md-sys-color-on-tertiary);
      }

      custom-elevation {
        --md-elevation-level: var(--elevation-level);
      }

      :host([type="elevated"]) custom-elevation {
        --md-elevation-level: 1;
      }

      button:hover, button:active  {
        --elevation-level: 2;
      }

      button:focus {
        --elevation-level: 0;
      }

      :host([type="filled"]), :host([type="outlined"]), :host([type="text"]) {
        --elevation-level: 0;
      }

      :host([has-label]) .label {
        padding-left: 24px;
        padding-right: 24px;
      }

      :host([has-icon]:not([has-label])) button {
        border-radius: 50%;
        width: 40px;
      }

      :host([has-icon][has-label]) .label {
        padding-left: 8px;
        padding-right: 24px;
      }
      :host([has-icon][has-label]) slot[name="icon"]::slotted(*) {
        padding-left: 16px;
      }

      :host([disabled]) .label, slot[name="icon"]::slotted(*) {
        opacity: 0.38;
      }
    </style>
    <button label=${this.label}>
      <custom-elevation></custom-elevation>
      <slot name="icon"></slot>
      <span class="label"> ${this.label} </span>
    </button>
    `
  }
}