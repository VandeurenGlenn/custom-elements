import { customElement } from 'custom-element-decorator'
import '../button/button.js'
import { LitElement, html } from 'lit'
import '@vandeurenglenn/flex-elements'

@customElement()
export class CustomBanner extends LitElement {

  constructor() {
    super()
  }
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
          magin-left: 16px;
          margin-right: 16px;
        }
      </style>
      <slot></slot>
      <flex-it flex="1"></flex-it>
      <custom-button type="tertiary">
        <span slot="icon">x</span>
        
      </custom-button>
    `
  }
}