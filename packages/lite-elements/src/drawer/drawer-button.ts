import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'
import '../button/icon-button.js'

@customElement('custom-drawer-button')
export class CustomDrawerButton extends LiteElement {
  @property({ type: Boolean, reflect: true })
  accessor mobile: boolean = false

  @property({ type: Boolean, reflect: true, attribute: 'drawer-open' })
  accessor drawerOpen: boolean

  @property()
  accessor id: string

  openPane() {
    document.dispatchEvent(new CustomEvent('custom-pane-open', { detail: this.id }))
  }

  static styles = [
    css`
      :host {
        display: block;
        opacity: 1;
        pointer-events: auto;
        will-change: width, opacity;
      }

      :host([drawer-open]) {
        opacity: 0;
        pointer-events: none;
        width: 0;
      }
    `
  ]

  render() {
    return html` <custom-icon-button @click=${() => this.openPane()} icon="menu"> </custom-icon-button> `
  }
}
