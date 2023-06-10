import { customElement } from 'custom-element-decorator'
import { CustomElement } from '../element.js'
import { propertiesConfig } from '../types.js'
import { html, css, nothing, LitElement } from 'lit'
import '../button/button.js'
import '../divider/divider.js'
import '../elevation/elevation.js'

@customElement()
/**
 * m3 ish card implementation
 * 
 * @example
 * html```
 * <custom-card type="filled"></custom-card> // default is elevated
 * ```
 */
export class LitCard extends LitElement {
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
    // await this.rendered
    await this.updateComplete
    this.requestUpdate()
    // this.render()
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
          display: inline-block;
          padding: 8px;
          position: relative;
        }

        .container {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          border: 1px solid;
          padding: 16px;
          border-radius: 12px;
          max-width: 320px;
          height: 100%;
          max-height: 320px;
          border-color: transparent;
          color: var(--md-sys-color-on-surface-variant);
          background: var(--md-sys-color-surface-variant);
          position: relative;
        }

        custom-elevation {
          --md-elevation-level: 1;
        }

        :host() :slotted(*) {
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
          border-color: var(--md-sys-color-outline);
        }

        :host([type="filled"]) custom-elevation {
          --md-elevation-level: 0;
        }

        :host([type="outlined"]) custom-elevation {
          --md-elevation-level: 0;
        }

        .actions {
          height: 44px;
        }
        
      </style>
      <span class="container">

        <custom-elevation></custom-elevation>
        <slot name="image"></slot>
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
    `
  }
}