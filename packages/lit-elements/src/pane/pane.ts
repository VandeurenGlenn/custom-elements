import { CSSResultGroup, LitElement, html } from 'lit'
import { property, customElement } from 'lit/decorators.js'
import '../elevation/elevation.js'
import '../button/button.js'
import '../icon/icon.js'
import style from '@vandeurenglenn/custom-shared-styles/pane.css'

@customElement('custom-pane')
export class CustomPane extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false

  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: String, reflect: true })
  type: 'modal' | undefined

  @property({ type: Boolean, reflect: true })
  left: boolean = true

  @property({ type: Boolean, reflect: true })
  right: boolean = false

  @property({ type: String, reflect: true })
  id: string

  #closePane = (event) => {
    event.stopPropagation()
    this.open = false
    document.dispatchEvent(
      new CustomEvent(`custom-pane-close`, { detail: this.id || `${this.left ? 'left' : 'right'}` })
    )
  }

  static styles?: CSSResultGroup = [style]

  render() {
    return html`
      <custom-elevation></custom-elevation>
      <aside>
        <slot name="header">
          <flex-row center>
            <slot name="headline"></slot>
            <flex-it></flex-it>
            <custom-button @click=${this.#closePane}>
              <custom-icon slot="icon">menu_open</custom-icon>
            </custom-button>
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
