import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { ScrollMixin } from '../mixins/scroll-mixin.js';
import './../elevation/elevation.js'

// @ts-ignore
@customElement('custom-section')
export class CustomSection extends ScrollMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: baseline;
        margin: 16px;
        position: relative;
        overflow-y: auto;
      }
      .container {
        align-items: center;
        box-sizing: border-box;
        padding: 12px;
        border-radius: var(--md-sys-shape-corner-extra-large);
      }
      .content {
        max-width: 720px;
      }
    `
  ];

  render() {
    return html`
    <flex-column class="container">
      <flex-column class="content">
        <slot></slot>
      </flex-column>
    </flex-column>
    `;
  }
}
