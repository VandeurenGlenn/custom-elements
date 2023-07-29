import { customElement } from 'lit/decorators.js'
import { LitElement, html, css } from 'lit';
import '../section/section.js'
import './code.js'

const replaceHtmlEntities = str => str
  .replace(/(\  <\/(?=[^<\/]*$))/g, '<')
@customElement('demo-section')
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
