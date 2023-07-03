import { customElement } from 'custom-element-decorator';
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js'

@customElement()
export class CustomSection extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        box-sizing: border-box;
        padding: 28px;
        align-items: center;
        justify-content: center;
      }

      flex-column {
        max-width: 720px;
      }
    `
  ];

  render() {
    return html`
    <flex-column>
      <slot></slot>
    </flex-column>
    `;
  }
}
