import { customElement } from 'custom-element-decorator'
import '../elevation/elevation.js'
import { CSSResultGroup, LitElement, PropertyValueMap, css, html } from 'lit'

@customElement()
export class CustomButton extends LitElement {
  label: string
  hasIcon: boolean
  hasLabel: boolean
  type: 'elevated' | 'filled' | 'text' | 'tonal' | 'outlined' = 'text'

  static properties = {
    label: { type: String },
    hasIcon: { type: Boolean, reflect: true, attribute: 'has-icon' },
    hasLabel: { type: Boolean, reflect: true, attribute: 'has-label' }
  }

  static styles?: CSSResultGroup = [
    css`
    :host {
      color: var(--md-sys-color-on-background);
      display: flex;

      height: 40px;
      
      border-radius: 20px;
      position: relative;

      --elevation-level: 0;
    }

    button {
      box-sizing: border-box;
      cursor: pointer;
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
    }

    .label, ::slotted(*) {
      font-family: var(--md-sys-typescale-label-large-font-family-name);
      font-style: var(--md-sys-typescale-label-large-font-family-style);
      font-weight: var(--md-sys-typescale-label-large-font-weight);
      font-size: var(--md-sys-typescale-label-large-font-size);
      letter-spacing: var(--md-sys-typescale-label-large-tracking);
      line-height: var(--md-sys-typescale-label-large-height);
      text-transform: var(--md-sys-typescale-label-large-text-transform);
      text-decoration: var(--md-sys-typescale-label-large-text-decoration);
    }

    :host([type="filled"]) {
      color: var(--md-sys-color-on-primary);
      background: var(--md-sys-color-primary);
    }

    :host([type="outlined"]) {
      color: var(--md-sys-color-on-surface);
      background: var(--md-sys-color-surface);
      border: solid 1px;
      border-color: var(--md-sys-color-outline);
    }

    :host([type="elevated"]) {
      color: var(--md-sys-color-primary);
      background: var(--md-sys-color-surface-container-low);
    }

    :host([type="tertiary"]), :host([type="tertiary"]) ::slotted(*) {
      background: var(--md-sys-color-tertiary);
      color: var(--md-sys-color-on-tertiary);
    }

    :host([type="tonal"]), :host([type="tonal"]) ::slotted(*) {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-seconday-container);
    }

    custom-elevation {
      --md-elevation-level: var(--elevation-level);
    }

    :host([type="elevated"]) custom-elevation {
      --elevation-level: 1;
    }

    button:hover, button:active  {
      --elevation-level: 2;
    }

    button:focus {
      --elevation-level: 0;
    }

    :host([type="filled"]), :host([type="outlined"]), :host([type="text"]), :host([type="tonal"]) {
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
    :host([has-icon][has-label]) slot[name="icon"]::slotted(*) {
      padding-left: 16px;
    }

    :host([disabled]) .label, slot[name="icon"]::slotted(*) {
      opacity: 0.38;
    }
    `
  ]

  async connectedCallback() {
    const slots = Array.from(this.querySelectorAll('slot'))
    for (const slot of slots) {
      slot.addEventListener('slotchange', this.#slotchange)
    }
    super.connectedCallback();
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    
    const iconSlot = this.shadowRoot.querySelector('slot[name="icon"]')
    // @ts-ignore
    this.hasIcon = (Array.from(iconSlot?.assignedNodes() || [])).length !== 0
    this.hasLabel = Boolean(this.label?.length > 0)
  }

  #slotchange = () => this.updated()

  render() {
    return html`
    <button label=${this.label}>
    <custom-elevation></custom-elevation>
      <slot name="icon"></slot>
      <span class="label"> ${this.label} </span>
    </button>
    `
  }
}