import { customElement, LiteElement, html, property } from '@vandeurenglenn/lite'
import '../elevation/elevation.js'
import '../button/button.js'
import '../pane/pane.js'
import style from '@vandeurenglenn/custom-shared-styles/drawer.css'

@customElement('custom-drawer')
export class CustomDrawer extends LiteElement {
  @property({ type: Boolean, reflect: true })
  accessor open: boolean

  @property({ type: Boolean, reflect: true })
  accessor mobile: boolean

  @property({ type: String, reflect: true })
  accessor type: 'modal' | undefined

  @property({ type: Boolean })
  accessor right: boolean

  @property({ type: String })
  accessor id: string

  connectedCallback(): void {
    document.addEventListener('custom-pane-close', ({ detail }: CustomEvent) => {
      if (this.id === detail) this.open = false
    })

    document.addEventListener('custom-pane-open', ({ detail }: CustomEvent) => {
      if (this.id === detail) this.open = true
    })
  }

  static styles? = [style]

  render() {
    return html`
      <custom-pane .open=${this.open} .mobile=${this.mobile} .type=${this.type} .id=${this.id}>
        <slot name="headline" slot="headline"></slot>
        <slot name="menu-button" slot="menu-button"></slot>
        <slot name="content" slot="content"></slot>
        <slot name="footer" slot="footer"></slot>
      </custom-pane>
    `
  }
}
