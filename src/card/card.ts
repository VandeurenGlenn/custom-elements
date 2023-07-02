import { customElement } from 'custom-element-decorator'
import { propertiesConfig } from '../types.js'
import '../button/button.js'
import '../divider/divider.js'
import '../elevation/elevation.js'
import { LitElement, html, nothing } from 'lit'

@customElement()
/**
 * m3 ish card implementation
 * 
 * @example
 * html```
 * <custom-card type="filled"></custom-card> // default is elevated
 * ```
 */
export class CustomCard extends LitElement {
  dividerType: 'full' | 'inset' | 'middle-inset'
  type: 'elevated' | 'filled' | 'outlined' = 'elevated'
  elevationLevel: Number = 0;

  static properties: propertiesConfig = {
    hasDivider: { type: Boolean },
    elevationLevel: {
      type: Number
    }
  }

  constructor() {
    super()
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback()

    await this.updateComplete
    this.requestUpdate()
  }
  

  renderDivider() {
    const actionsSlot = this.shadowRoot.querySelector('slot[name="actions"]')
    // @ts-ignore
    const children = Array.from(actionsSlot?.assignedNodes() || [])
    return children.length !== 0 ? 
        html`<custom-divider ?inset=${this.dividerType === 'inset'} ?middle-inset=${this.dividerType === 'inset'}></custom-divider>` :
        nothing;
  }

  render() {
    return html`
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          margin: 8px;
          position: relative;
          height: fit-content;
          max-height: 320px;
          width: 100%;
          max-width: 320px;
          border-radius: 12px;
          border: 1px solid;
          overflow: hidden;
        }

        .container {
          display: flex;
          flex-direction: column;
          max-width: 320px;
          height: max-content;
          max-height: 320px;
          border-color: transparent;
          color: var(--md-sys-color-on-surface-variant);
          background: var(--md-sys-color-surface-variant);
          /* position: absolute; */
        }

        .content-container {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding: 16px;
          height: 100%;
        }

        custom-elevation {
          --md-elevation-level: 1;
        }

        :host() ::slotted(*) {
          font-family: var(--md-sys-typescale-display-small-font-family-name);
          font-weight: var(--md-sys-typescale-display-small-font-family-style);
        }

        slot[name="headline"]::slotted(*) {
          
          font-weight: var(--md-sys-typescale-headline-large-font-weight);
          font-size: var(--md-sys-typescale-headline-large-font-size);
          line-height: var(--md-sys-typescale-headline-large-line-height);
          letter-spacing: var(--md-sys-typescale-headline-large-letter-spacing);
        
        }

        slot[name="subline"]::slotted(*) {
          font-weight: var(--md-sys-typescale-title-large-font-weight);
          font-size: var(--md-sys-typescale-title-large-font-size);

          line-height: var(--md-sys-typescale-title-large-line-height);
          letter-spacing: var(--md-sys-typescale-title-large-letter-spacing);
        }

        slot[name="supportingText"]::slotted(*) {
          margin: 8px 0 0 0;
          font-weight: var(--md-sys-typescale-body-medium-font-weight);
          font-size: var(--md-sys-typescale-body-medium-font-size);

          line-height: var(--md-sys-typescale-body-medium-line-height);
          letter-spacing: var(--md-sys-typescale-body-medium-letter-spacing);

          max-height: 144px;
          overflow-y: auto;
        }

        .supporting-text {
          max-height: 196px;
          overflow-y: scroll;
        }

        :host([type="filled"]) .container {
          color: var(--md-sys-color-on-secondary-container);
          background: var(--md-sys-color-secondary-container);
        }

        :host([type="outlined"]) .container {
          color: var(--md-sys-color-on-surface);
          background: var(--md-sys-color-surface);
        }

        :host([type="outlined"]) {
          border-color: var(--md-sys-color-outline);
        }

        :host([type="tertiary"]) .container {
          color: var(--md-sys-color-on-tertiary-container);
          background: var(--md-sys-color-tertiary-container);
        }

        :host([type="tertiary"]) {
          border-color: var(--md-sys-color-outline);
        }

        :host([type="filled"]) custom-elevation, :host([type="outlined"]) custom-elevation, :host([type="tertiary"]) custom-elevation  {
          --md-elevation-level: 0;
        }

        .actions {
          height: 44px;
        }
        
        ::slotted(*) {
          overflow: hidden;
          border-radius: 12px;
        }
      </style>
       <custom-elevation></custom-elevation>
      <span class="container">

        
        <slot name="image"></slot>

        <span class="content-container">
          <slot name="headline"></slot>
          <slot name="subline"></slot>
          <span class="supporting-text">
            <slot name="supportingText"></slot>
          </span>
          ${this.renderDivider()}
          <span class="actions">
            <slot name="actions"></slot>
          </span>
        </span>
        
        
      </span>
    `
  }
}