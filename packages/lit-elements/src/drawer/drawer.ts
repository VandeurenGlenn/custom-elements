import { customElement } from 'custom-element-decorator'
import { CSSResultGroup, LitElement, html } from 'lit'
import { property, query } from 'lit/decorators.js'
import '../elevation/elevation.js'
import '../button/button.js'
import '../pane/pane.js'
import style from '@vandeurenglenn/custom-shared-styles/drawer.css'

@customElement()
export class CustomDrawer extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false

  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: String, reflect: true })
  type: 'modal' | undefined

  @property({ type: Boolean })
  right: boolean = false

  @property({ type: String })
  id: string

  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('custom-pane-close', ({ detail }) => {
      if (this.id === detail) this.open = false
    })

    document.addEventListener('custom-pane-open', ({ detail }) => {
      if (this.id === detail) this.open = true
    })
  }

  static styles?: CSSResultGroup = [style]

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
