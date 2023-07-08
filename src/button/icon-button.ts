import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { ButtonType } from '../types.js';
import './button.js'
import './../icon/icon.js'

@customElement('custom-icon-button')
export class CustomIconButton extends LitElement {
  @property({ type: String })
  type: ButtonType = 'text'

  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
    <custom-button .type=${this.type}>
      <custom-icon slot="icon">
        <slot></slot>
      </custom-icon>
    </custom-button>
    `;
  }
}
