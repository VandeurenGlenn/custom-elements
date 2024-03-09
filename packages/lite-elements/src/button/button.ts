import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'
import '../elevation/elevation.js'

@customElement('custom-button')
export class CustomButton extends LiteElement {
  @property({ attribute: 'has-icon', reflect: true })
  accessor hasIcon: boolean
  @property({ attribute: 'has-label', reflect: true })
  accessor hasLabel: boolean

  @property({ attribute: 'type', reflect: true })
  accessor type: 'elevated' | 'filled' | 'text' | 'tonal' | 'outlined' = 'text'

  @property()
  accessor label

  static get observedAttributes() {
    return ['label', 'type']
  }
  attributeChangedCallback(name, old, value) {
    if (this[name] !== old) this[name] = value
  }
  static styles = [
    css`
      :host {
        color: var(--custom-button-color, --md-sys-color-on-background);
        display: flex;

        height: 40px;
        border-radius: 20px;
        position: relative;
        pointer-events: auto;
        cursor: pointer;

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
        padding: none;
        width: inherit;
        height: inherit;
        display: flex;
        pointer-events: none;
      }

      .label,
      ::slotted(*) {
        font-family: var(--md-sys-typescale-label-large-font-family-name);
        font-style: var(--md-sys-typescale-label-large-font-family-style);
        font-weight: var(--md-sys-typescale-label-large-font-weight);
        font-size: var(--md-sys-typescale-label-large-font-size);
        letter-spacing: var(--md-sys-typescale-label-large-tracking);
        line-height: var(--md-sys-typescale-label-large-height);
        text-transform: var(--md-sys-typescale-label-large-text-transform);
        text-decoration: var(--md-sys-typescale-label-large-text-decoration);
      }

      :host([type='filled']),
      :host([type='filled']) ::slotted(*) {
        color: var(--md-sys-color-on-primary);
        fill: var(--md-sys-color-on-primary);
        background: var(--md-sys-color-primary);
      }

      :host([type='outlined']),
      :host([type='outlined']) ::slotted(*) {
        color: var(--md-sys-color-on-surface);
        fill: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface);
        border: solid 1px;
        border-color: var(--md-sys-color-outline);
      }

      :host([type='elevated']),
      :host([type='elevated']) ::slotted(*) {
        color: var(--md-sys-color-primary);
        fill: var(--md-sys-color-primary);
        background: var(--md-sys-color-surface-container-low);
      }

      :host([type='tertiary']),
      :host([type='tertiary']) ::slotted(*) {
        background: var(--md-sys-color-tertiary);
        color: var(--md-sys-color-on-tertiary);
        fill: var(--md-sys-color-on-tertiary);
      }

      :host([type='tonal']),
      :host([type='tonal']) ::slotted(*) {
        background: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-seconday-container);
        fill: var(--md-sys-color-on-seconday-container);
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
      }
      :host([has-icon][has-label]) slot[name='icon']::slotted(*) {
        padding-left: 16px;
      }

      :host([disabled]) .label,
      :host([disabled]) slot[name='icon']::slotted(*) {
        opacity: 0.38;
      }

      ::slotted(*) {
        pointer-events: none;
      }

      :host(:focus),
      :host(:hover) {
        --elevation-level: 2;
      }

      :host(:active) {
        --elevation-level: 0;
      }

      button * {
        pointer-events: none;
      }
    `
  ]

  connectedCallback() {
    const slots = Array.from(this.querySelectorAll('slot'))
    for (const slot of slots) {
      slot.addEventListener('slotchange', () => this.#slotchange(slot))
    }
    console.log(slots)

    this.hasIcon = slots?.[0]?.assignedNodes.length > 0

    console.log(this.hasIcon)
  }
  onChange(propertyKey, value) {
    if (propertyKey === 'label') {
      if (value) this.hasLabel = true
      else this.hasLabel = false
    }
  }
  #slotchange = (slot) => {
    if (slot.getAttribute('name') === 'icon') {
      this.hasIcon = Array.from(slot?.assignedNodes() || []).length !== 0
    }
  }

  render() {
    return html`
      <button label=${this.label}>
        <custom-elevation></custom-elevation>
        <slot name="icon"></slot>
        <span class="label">${this.label}</span>
      </button>
    `
  }
}
