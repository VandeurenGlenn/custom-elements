import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import './../icon/icon.js'

@customElement('custom-drawer-button')
export class CustomDrawerButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  static styles = [
    css`
      :host {
        display: block;
      }

      :host(:not([mobile])) {
        opacity: 0;
        pointer-events: none;
      }
    `
  ];

  connectedCallback(): void {
    super.connectedCallback()
    const media = matchMedia('(max-width: 720px)')
   
    const mediaQueryChange = ({matches}) => {
      this.mobile = matches
    }
    media.onchange = mediaQueryChange
    mediaQueryChange({ matches: media.matches })
    this.addEventListener('click', () => {
      if (this.mobile) document.dispatchEvent(new CustomEvent('toggle-drawer'))
    })
    
  }

  render() {
    return html`
    <custom-button>
      <custom-icon slot="icon">
      menu
      </custom-icon>
    </custom-button>
    `;
  }
}
