import { customElement } from 'custom-element-decorator';
import { LitElement, html, css } from 'lit';
import './../section/section.js'
import converter from 'html-to-markdown'
import './code.js'

const replaceHtmlEntities = str => str
  .replace(/(\  <\/(?=[^<\/]*$))/g, '<')
@customElement()
export class DemoSection extends LitElement {
  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    const assignedElements = this.shadowRoot.querySelector('slot').assignedElements()
    for (const element of assignedElements) {
      const code = document.createElement('demo-code')

      code.code = await replaceHtmlEntities(element.outerHTML)  

      element.after(code)
    }
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow-y: auto;
      }
    `
  ];

  render() {
    return html`
    <custom-section>
      <slot></slot>
    </custom-section>
    `;
  }
}
