import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@vandeurenglenn/lite-elements/icon.js'
import '@vandeurenglenn/flex-elements/column.js'
import '@vandeurenglenn/flex-elements/row.js'

@customElement('custom-notification')
export class CustomNotification extends LitElement {
  @property()
  accessor title: string

  @property()
  accessor message: string

  @property()
  accessor image: string

  @property()
  accessor type: 'error' | 'info' | 'warning'

  #onclick = () => {
    this.parentElement.removeChild(this)
  }

  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      font-size: 13px;
      border: 1px solid;
      border-radius: 12px;
      padding: 6px 12px;
      box-sizing: border-box;
      margin-bottom: 12px;
    }

    flex-row {
      height: 24px;
      box-sizing: border-box;
      align-items: center;
    }

    strong {
      font-size: 14px;
    }
  `

  render() {
    return html`
      ${this.image ? html`<img src=${this.image} />` : ''}
      <flex-column>
        <flex-row>
          <strong>${this.title}</strong>
          <flex-it></flex-it>
          <custom-icon icon="close" @click=${this.#onclick}></custom-icon>
        </flex-row>

        <p>${this.message}</p>
      </flex-column>
    `
  }
}
