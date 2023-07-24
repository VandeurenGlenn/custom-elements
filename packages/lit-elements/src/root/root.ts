import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import '../theme/theme.js'

@customElement('custom-root')
export class CustomRoot extends LitElement {
  static styles = [
    css`
      :host {
        display: contents
      }
    `
  ];

  render() {
    return html`
    <custom-theme></custom-theme>
    <slot></slot>
    `;
  }
}
