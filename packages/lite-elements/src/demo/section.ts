import { customElement, LiteElement, html, css } from '@vandeurenglenn/lite'
import '../section/section.js'
import './code.js'
import { DemoCode } from './code.js'

const replaceHtmlEntities = (str) => str.replace(/(\  <\/(?=[^<\/]*$))/g, '<')
@customElement('demo-section')
export class DemoSection extends LiteElement {
  async firstRender(): Promise<void> {
    const assignedElements = this.shadowRoot.querySelector('slot').assignedElements()
    for (const element of assignedElements) {
      const code = document.createElement('demo-code') as DemoCode

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
  ]

  render() {
    return html`
      <custom-section>
        <slot></slot>
      </custom-section>
    `
  }
}
