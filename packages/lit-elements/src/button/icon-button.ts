import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import './button.js'
import './../icon/icon-font.js'
@customElement('custom-icon-button')
export class CustomIconButton extends LitElement {
  @property({ type: String })
  icon: string

  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
    <custom-button>
      <custom-icon-font slot="icon" .icon=${this.icon}>
        <slot></slot>
      </custom-icon-font>
    </custom-button>
    `;
  }
}
