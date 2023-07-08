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
