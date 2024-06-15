import { customElement, LiteElement, html } from '@vandeurenglenn/lite'
import '../button/button.js'

@customElement('custom-divider')
export class CustomDivider extends LiteElement {
  static properties = {
    inset: { type: Boolean, reflect: true, attribute: 'inset' },
    middleInset: { type: Boolean, reflect: true, attribute: 'middle-inset' }
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          min-height: 1px;
          margin: 8px 0 16px 0;
          width: 100%;
          background: var(--md-sys-color-outline);
        }

        :host([inset]) {
          margin-left: 16px;
          margin-right: 0;
        }

        :host([middle-inset]) {
          margin-left: 16px;
          margin-right: 16px;
        }
      </style>
    `
  }
}
