import { customElement } from 'custom-element-decorator'
import '../elevation/elevation.js'
import { LitElement, html } from 'lit'

@customElement()
export class CustomButton extends LitElement {
  label: string
  type: 'elevated' | 'filled' | 'text' | 'outlined' = 'text'

  static properties = {
    label: { type: String }
  }

  constructor() {
    super()
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    this.requestUpdate()
  }

  renderLabel() {
    const iconSlot = this.shadowRoot.querySelector('slot[name="icon"]')
    // @ts-ignore
    const children = Array.from(iconSlot?.assignedNodes() || [])
    return children.length !== 0 ? 
        html`<span class="label with-icon"> ${this.label} </span>` :
        html`<span class="label"> ${this.label} </span>`;
  }


  render() {
    return html`
    <style>
      :host {
        display: contents:
      }

      button {
        height: 40px;
        box-sizing: border-box;
        border: none;
        cursor: pointer;
        border-radius: 20px;
        position: relative;
        background: transparent;

        color: var(--md-sys-color-on-background);
      }

      .label {
        padding: 16px;
        font-family: var(--md-sys-typescale-label-large-font-family-name);
        font-size: var(--md-sys-typescale-label-large-font-size);
        line-height: var(--md-sys-typescale-label-large-line-height);
        letter-spacing: var(--md-sys-typescale-label-large-letter-spacing);
      }

      .label.with-icon {
        padding: 0 16px 0 8px;
      }

      slot[name="icon"]::slotted(*) {
        padding-left: 16px;
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
      button:hover, button:focus, button:active  {
        --elevation-level: 2;
      }

      custom-elevation {

        --md-elevation-level: var(--elevation-level);
      }

      :host([type="elevated"]) custom-elevation {
        --md-elevation-level: 1;
      }

      :host([type="filled"]) custom-elevation, :host([type="outlined"]) custom-elevation, :host([type="outlined"]) custom-elevation {
        --md-elevation-level: 0;
      }
    </style>
    <button label=${this.label}>
    <custom-elevation></custom-elevation>
      <slot name="icon"></slot>
      ${this.renderLabel()}
    </button>
    `
  }
}