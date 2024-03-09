import { customElement, LiteElement, css, html } from '@vandeurenglenn/lite'
import '../theme/theme.js'

@customElement('custom-root')
export class CustomRoot extends LiteElement {
  static styles = [
    css`
      :host {
        display: contents;
      }
    `
  ]

  render() {
    return html`
      <custom-theme></custom-theme>
      <slot></slot>
    `
  }
}
