import { css } from './../helpers.js';
import { customElement } from 'lit/decorators.js'

@customElement('custom-toggle')
export class CustomToggle extends HTMLElement {
  #child: Element
  restartOnEnd: boolean = true

  static get observedAttributes() { return ['active', 'restart-on-end']; }

  attributeChangedCallback(name, oldValue, value) {
    const _name = name.replaceAll(/(?:\-)([aA-zZ])/g, (_, $1) => {
      return $1.toUpperCase()
    })
    
    if (oldValue !== value) {
      if (_name === 'restartOnEnd') {
        if (this.getAttribute('restart-on-end') === 'false') this[_name] = false
        else this[_name] = true
      } else this[_name] = value
      
    }
    if (name === 'active') {
      const child = Array.from(this.children)[value]
      if (this.#child) this.shadowRoot.replaceChild(child.cloneNode(true), this.#child)
      else this.shadowRoot.appendChild(child.cloneNode(true))
      this.#child = this.shadowRoot.querySelector(child.localName)
    }
  }
  
  set active(value: number) {
    if (this.getAttribute('active') !== String(value)) this.setAttribute('active', String(value))
  }

  get active() {
    return Number(this.getAttribute('active'))
  }

  next() {
    if (this.active < this.childElementCount - 1) this.active += 1
    else if (this.restartOnEnd) this.active = 0
  }

  previous() {
    if (this.active !== 0) this.active -= 1
  }

  static styles = [
    css`
      :host {
        display: contents
      }
    `
  ];

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    const sheets = []

    for (const style of CustomToggle.styles) {
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(style)
    }

    this.shadowRoot.adoptedStyleSheets = sheets
  }

  connectedCallback(): void {
    if (!this.active) this.active = Number(this.getAttribute('active')) || 0
  }
}
