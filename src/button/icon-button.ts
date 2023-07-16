import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { ButtonType } from '../types.js';
import './button.js'
import './../icon/icon.js'
import { CustomButton } from './button.js';

@customElement('custom-icon-button')
export class CustomIconButton extends CustomButton {
  static styles?: CSSResultGroup = [
    CustomButton.styles,
    css`
    :host {width: 40px}
    `
  ]
  connectedCallback(): Promise<void> {
    super.connectedCallback()
  }
  render() {
    super.render()
    return html`
    <button label=${this.label}>
    <custom-elevation></custom-elevation>
      <custom-icon><slot></slot></custom-icon>
    </button>
    `;
  }
}
