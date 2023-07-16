import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import './../icon/icon.js'
import './../button/icon-button.js'
// import { publish } from '../decorators/pubsub.js';

@customElement('custom-drawer-button')
export class CustomDrawerButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: Boolean, reflect: true, attribute: 'drawer-open' })
  drawerOpen: boolean


  static styles = [
    css`
      :host {
        display: block;
        opacity: 1;
        pointer-events: auto;
        will-change: width, opacity;
      }

      :host([drawer-open]) {
        opacity: 0;
        pointer-events: none;
        width: 0;
      }
    `
  ];

  render() {
    return html`
    <custom-icon-button>
      menu
    </custom-icon-button>
    `;
  }
}
