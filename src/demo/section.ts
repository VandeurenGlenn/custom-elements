import { customElement } from 'custom-element-decorator';
import { LitElement, html, css } from 'lit';
import './../section/section.js'
import converter from 'html-to-markdown'

@customElement()
export class DemoSection extends LitElement {
  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    const assignedElements = this.shadowRoot.querySelector('slot').assignedElements()
    for (const element of assignedElements) {
      const pre = document.createElement('pre')
      const code = document.createElement('code')

      code.innerHTML = await converter.convert(JSON.parse(JSON.stringify(element.outerHTML.replaceAll('<', '&lt;'), null, '\t')))
      console.log(code.innerHTML);
      
      pre.appendChild(code.cloneNode(true))

      element.after(pre)
    }
    
    

  }
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }

      code {
        
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
