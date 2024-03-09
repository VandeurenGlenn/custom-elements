import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'

@customElement('demo-code')
export class DemoCode extends LiteElement {
  @property({ type: String })
  accessor code: string

  static styles = [
    css`
      :host {
        display: flex;

        color: var(--md-sys-color-on-surface-variant);
        box-sizing: border-box;
        width: 100%;
        box-sizing: border-box;
        background: var(--md-sys-color-surface-variant);
        border: 1px solid var(--md-sys-color-outline);
        border-radius: var(--md-sys-shape-corner-large);

        /* margin-left: -100%; */
        /* display: inline-block; */
        margin: 12px 0 24px 0;

        align-items: center;
      }
      pre,
      code {
        margin: 0;
        padding: 0;
        overflow: auto;
      }
      pre {
        margin-bottom: -12px;
        margin-left: -46px;
      }
    `
  ]

  render() {
    return html`
      <pre class="language-html">
      <code class="language-html">
        ${this.code}
      </code>
      </pre>
    `
  }
}
