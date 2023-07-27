import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import './dropdown.js'
import './../menu/menu.js'

@customElement('custom-dropdown-menu')
export class CustomDropdownMenu extends LitElement {
  @property({ type: Boolean, reflect: true })
  right

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this.hasUpdated && this.bottom) {
      this.shadowRoot.querySelector('custom-dropdown').style.transition = 'none'
      this.shadowRoot.querySelector('custom-dropdown').style.opacity = '0'
      this.shadowRoot.querySelector('custom-dropdown').style.transform = 'scale(1, 1)'
      const {height} = this.shadowRoot.querySelector('custom-dropdown').getBoundingClientRect()
      this.style.setProperty('--custom-dropdown-top', `-${height + 8}px`)
      this.shadowRoot.querySelector('custom-dropdown').style = null
    } else this.style.setProperty('--custom-dropdown-top', `48px`)
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    
   
  }
  @property({ type: Boolean, reflect: true })
  bottom: boolean

  @property({ type: Boolean })
  open: boolean

  @property({ type: String })
  icon: string = 'more_vert'

  #onselected = ({detail}) => {
    this.dispatchEvent(new CustomEvent('selected', {detail}))
  }

  #renderButton = () => {
    return html`
    <custom-button @click=${() => this.open = !this.open}>
      <custom-icon-font slot="icon" icon=${this.icon}>more_vert</custom-icon-font>
    </custom-button>
    `
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
    ${this.#renderButton()}
    
    <custom-dropdown .shown=${this.open} ?right=${this.right} ?bottom=${this.bottom}>
      <custom-elevation></custom-elevation>
      <custom-menu @selected=${this.#onselected}>
        <slot></slot>
      </custom-menu>
    </custom-dropdown>
    
    `;
  }
}
