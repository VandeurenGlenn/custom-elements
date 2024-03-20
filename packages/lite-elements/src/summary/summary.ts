import { css, customElement, html, LiteElement } from '@vandeurenglenn/lite'
@customElement('custom-summary')
export class CustomSummary extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 400px;
        max-width: 1200px;
      }
      ::slotted([slot='left']) {
        padding-bottom: 24px;
      }
      @media (min-width: 1200px) {
        :host {
          flex-direction: row;
          width: 80%;
        }
        ::slotted([slot='left']) {
          padding-right: 24px;
          padding-bottom: 0;
        }
      }
    `
  ]

  render() {
    return html`
      <slot name="left"></slot>
      <slot name="right"></slot>
    `
  }
}
