import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('demo-code')
export class DemoCode extends LitElement {
  @property({ type: String })
  code: string

  static styles = [
    css`
      :host {
        display: block;
        background: var(--md-sys-color-surface-variant);
        color: var(--md-sys-color-on-surface-variant);
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        /* margin-left: -100%; */
        /* display: inline-block; */
        overflow-x: auto;
        margin: 12px 0 24px 0;
      }
    `
  ];

  render() {
    return html`
    <pre>
      <code>
        ${this.code}
      </code>
      </pre>
    `;
  }
}
