import { customElement, LiteElement, css, html, property, query, assignedElements } from '@vandeurenglenn/lite'
import '../elevation/elevation.js'
import '../button/icon-button.js'
import '../icon/icon.js'
import style from '@vandeurenglenn/custom-shared-styles/pane.css'

@customElement('custom-pane')
export class CustomPane extends LiteElement {
  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false

  @property({ type: Boolean, reflect: true })
  accessor mobile: boolean = false

  @property({ type: String, reflect: true })
  accessor type: 'modal' | undefined

  @property({ type: Boolean, reflect: true })
  accessor left: boolean = true

  @property({ type: Boolean, reflect: true })
  accessor right: boolean = false

  @property({ type: String })
  accessor id: string

  @property({ type: String })
  accessor icon: string

  closePane(event) {
    event.stopPropagation()
    this.open = false
    document.dispatchEvent(
      new CustomEvent(`custom-pane-close`, { detail: this.id || `${this.left ? 'left' : 'right'}` })
    )
  }

  static styles = [style]

  render() {
    return html`
      <custom-elevation></custom-elevation>
      <aside>
        <slot name="header">
          <flex-row center>
            <slot name="headline"></slot>
            <flex-it></flex-it>

            <custom-icon-button @click=${(e) => this.closePane(e)} .id=${this.id} .icon=${this.icon || 'menu_open'}>
            </custom-icon-button>
          </flex-row>
        </slot>
        <flex-column class="content">
          <slot name="content"></slot>
        </flex-column>
        <flex-row class="footer">
          <slot name="footer"></slot>
        </flex-row>
      </aside>
    `
  }
}
