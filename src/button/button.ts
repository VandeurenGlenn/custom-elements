import { customElement } from 'custom-element-decorator'
import { CustomElement } from '../element.js'
import { propertiesConfig } from '../types.js'
import { html } from 'lit-html'

@customElement()
export class CustomButton extends CustomElement {
  headline: string

  static properties: propertiesConfig = {
    headline: { type: String }
  }

  constructor() {
    super()
  }

  template() {
    return html`
    <h1>${this.headline}</h1>
    `
  }
}