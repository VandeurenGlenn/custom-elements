import { LiteElement, customElement, css, html } from '@vandeurenglenn/lite'
import './../dropdown/dropdown.js'
import { CustomSelector } from './../selector/selector.js'
import './../selector/selector.js'

@customElement('custom-menu')
export class CustomMenu extends LiteElement {
  get selector(): CustomSelector {
    return this.shadowRoot.querySelector('custom-selector')
  }

  set selected(value) {
    this.selector.selected = value
  }

  get selected() {
    return this.selector.selected
  }

  select(selected) {
    this.selector.select(selected)
  }

  #onselected = ({ detail }: CustomEvent) => {
    this.dispatchEvent(new CustomEvent('selected', { detail }))
  }

  connectedCallback() {
    this.selector.addEventListener('selected', this.#onselected)
  }

  disconnectedCallback() {
    this.selector.removeEventListener('selected', this.#onselected)
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 120px;
        max-width: 280px;
      }
    `
  ]

  render() {
    return html`
      <custom-selector>
        <slot></slot>
      </custom-selector>
    `
  }
}
