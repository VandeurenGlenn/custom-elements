import { css, customElement, html, LiteElement } from '@vandeurenglenn/lite'
@customElement('custom-summary-mirror')
export class CustomSummaryMirror extends LiteElement {
  connectedCallback() {
    const match = window.matchMedia('(min-width: 1200px)')
    this._matches(match)
    this._matches = this._matches.bind(this)
    match.onchange = this._matches
  }

  _matches({ matches }) {
    const left = this.querySelector('[slot="left"]')
    const right = this.querySelector('[slot="right"]')
    if (matches) {
      if (right.hasAttribute('switched')) {
        left.removeAttribute('switched')
        left.setAttribute('slot', 'right')
        right.setAttribute('slot', 'left')
      }
    } else {
      left.setAttribute('switched', '')
      left.setAttribute('slot', 'right')
      right.setAttribute('slot', 'left')
    }
  }

  get template() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 400px;
          max-width: 1200px;
        }

        @media (min-width: 1200px) {
          :host {
            flex-direction: row;
            width: 80%;
          }
        }
      </style>
      <slot name="left"></slot>
      <slot name="right"></slot>
    `
  }
}
