import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { ScrollMixin } from '../mixins/scroll-mixin.js';

// @ts-ignore
@customElement('custom-section')
export class CustomSection extends ScrollMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: flex;
        box-sizing: border-box;
        padding: 28px;
        justify-content: center;
        overflow-y: auto; 
        align-items: baseline;
      }

      flex-column {
        max-width: 720px;
      }
    `
  ];

  render() {
    return html`
    <flex-column>
      <slot></slot>
    </flex-column>
    `;
  }
}
