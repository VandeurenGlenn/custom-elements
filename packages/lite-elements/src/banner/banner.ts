import '../button/icon-button.js'
import { customElement, LiteElement, html } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/it.js'

@customElement('custom-banner')
export class CustomBanner extends LiteElement {
  render() {
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          height: 40px;
          padding: 8px 16px;
          background: var(--md-sys-color-tertiary);
          color: var(--md-sys-color-on-tertiary);
        }

        :host([inset]) {
          margin-left: 16px;
          margin-right: 0;
        }

        :host([middle-inset]) {
          margin-left: 16px;
          margin-right: 16px;
        }
        custom-icon {
          --custom-icon-size: 12px;
        }

        custom-icon-button {
          height: 24px;
          width: 24px;
        }
      </style>
      <slot></slot>
      <flex-it flex="1"></flex-it>
      <slot name="actions">
        <custom-icon-button icon="close"></custom-icon-button>
      </slot>
    `
  }
}
