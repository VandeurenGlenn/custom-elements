import { customElement } from 'custom-element-decorator'
import '../button/button.js'
import { LitElement, html } from 'lit'

@customElement()
export class CustomDivider extends LitElement {

  static properties = {
    inset: { type: Boolean },
    middleInset: { type: Boolean }
  }

  constructor() {
    super()
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    this.requestUpdate()
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          width: 100%;
          height: 1px;
          margin: 8px 0 16px 0;
          background: var(--md-sys-color-outline);
        }

        :host([inset]) {
          margin-left: 16px;
          margin-right: 0;
        }

        :host([middle-inset]) {
          magin-left: 16px;
          margin-right: 16px;
        }
      </style>
    `
  }
}