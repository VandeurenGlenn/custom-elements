import { customElement, LiteElement, html, css, property, query } from '@vandeurenglenn/lite'
import './dropdown.js'
import './../menu/menu.js'
import './../icon/icon.js'
import { CustomMenu } from './../menu/menu.js'
import { CustomDropdown } from './dropdown.js'

@customElement('custom-dropdown-menu')
export class CustomDropdownMenu extends LiteElement {
  @property({ type: Boolean, reflect: true })
  accessor right: boolean

  @property({ type: Boolean, reflect: true })
  accessor bottom: boolean

  @property({ type: Boolean, attribute: 'close-on-select' })
  accessor closeOnSelect: boolean = true

  @property({ type: Boolean, attribute: 'close-on-click' })
  accessor closeOnClick: boolean = true

  @property({ type: Boolean, reflect: true })
  accessor open: boolean

  @property({ type: String })
  accessor icon: string = 'more_vert'

  @query('custom-menu')
  accessor _menu: CustomMenu

  @query('custom-dropdown')
  accessor _dropdown: CustomDropdown

  private _onselected = ({ detail }) => {
    this.dispatchEvent(new CustomEvent('selected', { detail }))
    if (this.closeOnSelect) {
      this.open = false
      this._menu.selected = undefined
    }
  }

  private _scrimClick = () => {
    if (this.closeOnClick) {
      this.open = false
    }
  }

  static styles = [
    css`
      :host {
        position: relative;
        display: block;
        --custom-dropdown-top: 48px;
      }

      custom-dropdown {
        display: flex;
        flex-direction: column;
        width: fit-content;
        top: var(--custom-dropdown-top);
        padding: 8px 0;
        border-radius: var(--md-sys-shape-corner-extra-small);
      }

      custom-elevation {
        --md-elevation-level: var(--elevation-level, 1);
        border-radius: var(--md-sys-shape-corner-extra-small);
      }

      :host([bottom]) custom-dropdown {
        transform-origin: bottom left;
        top: auto;
        bottom: var(--custom-dropdown-top);
      }

      :host([right]) custom-dropdown {
        transform-origin: top right;
        right: 0;
      }

      :host([bottom][right]) custom-dropdown {
        transform-origin: bottom right;
      }

      .scrim {
        position: fixed;
        inset: 0;
        pointer-events: none;
      }

      :host([open]) .scrim {
        pointer-events: auto;
      }
    `
  ]

  render() {
    return html`
      <span class="scrim" @click=${this._scrimClick}></span>

      <custom-button part="button" @click=${() => (this.open = !this.open)}>
        <custom-icon slot="icon" .icon=${this.icon}></custom-icon>
      </custom-button>

      <custom-dropdown part="dropdown" .open=${this.open} ?right=${this.right} ?bottom=${this.bottom}>
        <custom-elevation></custom-elevation>
        <custom-menu @selected=${this._onselected}>
          <slot></slot>
        </custom-menu>
      </custom-dropdown>
    `
  }
}
