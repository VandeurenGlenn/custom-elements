import { customElement, LiteElement, html, property, listen } from '@vandeurenglenn/lite'
import '../button/button.js'
import './toggle.js'

@customElement('custom-toggle-button')
export class CustomToggleButton extends LiteElement {
  @property({ type: Number })
  accessor active: number = 0

  @property({ type: Array })
  accessor togglers: string[]

  private get _toggle() {
    return this.shadowRoot.querySelector('custom-toggle')
  }

  @listen('click')
  onClick() {
    this._toggle.next()
  }

  private _onactive = (event: CustomEvent) => {
    this.dispatchEvent(new CustomEvent('active', { detail: event.detail }))
  }

  render() {
    return html` <custom-button>
      <custom-toggle slot="icon" .active=${this.active} @active=${this._onactive} .togglers=${this.togglers}>
      </custom-toggle>
    </custom-button>`
  }
}
