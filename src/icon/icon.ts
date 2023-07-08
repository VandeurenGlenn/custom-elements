import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('custom-icon')
export class CustomIcon extends LitElement {
  static styles = [
    css`
      :host {
        --custom-icon-size: 24px;
      }

      slot {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
        font-family: 'Material Symbols Outlined';
        font-size: var(--custom-icon-size);
        height: var(--custom-icon-size);
        width: var(--custom-icon-size);
      }
    `
  ];

  render() {
    return html`
    <slot></slot>
    `;
  }
}
