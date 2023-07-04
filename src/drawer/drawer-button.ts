import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

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
      
      .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
        font-size: 24px;
        font-family: 'Material Symbols Outlined';
        height: 24px;
        width: 24px;
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
   <div class="material-symbols-outlined" slot="icon">
   menu
   </div>
    </custom-button>
    `;
  }
}
