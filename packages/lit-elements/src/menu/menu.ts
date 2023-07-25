import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import './../dropdown/dropdown.js'
@customElement('custom-menu')
export class CustomMenu extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean

  @property({ type: String })
  icon: string = 'more_vert'

  @property({ type: String, reflect: true })
  type: 'dropdown' | undefined

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
        display: flex;

        flex-direction: column;
        position: relative;
        width: 100%;
        min-width: 120px;
        max-width: 280px;
      }

      custom-dropdown {
        top: 48px;
        padding: 8px 0;
        border-radius: var(--md-sys-shape-corner-extra-small);
      }

      :host(:not([type="dropdown"])) custom-dropdown {
        position: relative;
        top: 0;
      }
      
      custom-elevation {
        --md-elevation-level: var(--elevation-level, 1);
        border-radius: var(--md-sys-shape-corner-extra-small);
      }
    `
  ];

  render() {
    return html`
    ${this.type === 'dropdown' ? this.#renderButton() : ''}
    
    <custom-dropdown .shown=${this.type !== 'dropdown' || this.open}>
      <custom-elevation></custom-elevation>
      <custom-selector @selected=${this.#onselected}>
        <slot></slot>
      </custom-selector>
      
    </custom-dropdown>
    
    `;
  }
}
