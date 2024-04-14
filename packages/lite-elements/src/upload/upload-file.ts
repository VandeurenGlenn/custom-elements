import { LiteElement, css, customElement, html, property } from '@vandeurenglenn/lite'

@customElement('custom-upload-file')
export class CustomUploadFile extends LiteElement {
  @property({ type: Boolean })
  accessor multiple

  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        input {
          display: hidden;
        }
      `
    ]
  }
  render() {
    return html`<input type="file" ?multiple=${this.multiple} />`
  }
}
