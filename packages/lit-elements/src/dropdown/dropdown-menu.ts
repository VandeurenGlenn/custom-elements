import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'
import './dropdown.js'
import './../menu/menu.js'
import './../icon/icon.js'
import { CustomMenu } from './../menu/menu.js';
import { CustomDropdown } from './dropdown.js';

@customElement('custom-dropdown-menu')
export class CustomDropdownMenu extends LitElement {
  @property({ type: Boolean, reflect: true })
  right: boolean

  @property({ type: Boolean, reflect: true })
  bottom: boolean

  @property({ type: Boolean })
  open: boolean

  @property({ type: String })
  icon: string = 'more_vert'

  @query('custom-menu')
  _menu: CustomMenu

  @query('custom-dropdown')
  _dropdown: CustomDropdown

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this.hasUpdated && this.bottom) {
      this._dropdown.style.transition = 'none'
      this._dropdown.style.opacity = '0'
      this._dropdown.style.transform = 'scale(1, 1)'
      const {height} = this._dropdown.getBoundingClientRect()
      this.style.setProperty('--custom-dropdown-top', `-${height + 8}px`)
      // this._dropdown.style = null
    } else this.style.setProperty('--custom-dropdown-top', `48px`)
  }

  #onselected = ({detail}) => {
    this.dispatchEvent(new CustomEvent('selected', {detail}))
    this.open = false
    this._menu.selected = undefined
  }

  static styles = [
    css`
      :host {
        position: relative;
        display: block;
      }

      custom-dropdown {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 120px;
        max-width: 280px;
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
        top: var(--custom-dropdown-top);
      }

      :host([right]) custom-dropdown {
        transform-origin: top right;
        right: 0;
      }

      :host([bottom][right]) custom-dropdown {
        transform-origin: bottom right;
      }
    `
  ];

  render() {
    return html`
    <custom-button @click=${() => this.open = !this.open}>
      <custom-icon slot="icon" icon=${this.icon}>more_vert</custom-icon>
    </custom-button>
    
    <custom-dropdown .shown=${this.open} ?right=${this.right} ?bottom=${this.bottom}>
      <custom-elevation></custom-elevation>
      <custom-menu @selected=${this.#onselected}>
        <slot></slot>
      </custom-menu>
    </custom-dropdown>
    
    `;
  }
}
