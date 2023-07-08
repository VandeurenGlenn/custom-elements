import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('custom-top-app-bar')
export class CustomTopAppBar extends LitElement {
  
  @property({ type: String, reflect: true })
  type: 'center-aligned' | 'small' | 'medium' | 'large' = 'center-aligned'

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 20px 16px 24px 16px;
        box-sizing: border-box;
        width: 100%;
        position: relative;
        height: 64px;
      }

      :host([type="center-aligned"]) flex-row, :host([type="small"]) flex-row {
        align-items: center;
      }

      :host(:not([type="center-aligned"])) ::slotted([name="title"]) {
        padding-left: 16px;
      }

      :host(:not([type="large"])) ::slotted([name="title"]) {
        padding-bottom: 28px;
      }

      :host([type="center-aligned"]) slot[name="title"]::slotted(*) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%)
      }
    `
  ];

  render() {
    return html`
    <flex-row>
      <slot name="start"></slot>
      <slot name="title"></slot>
      <flex-one></flex-one>
      <slot name="end"></slot>
    </flex-row>
    <flex-column>
      <slot name="headline"></slot>
    </flex-column>
    `;
  }
}
