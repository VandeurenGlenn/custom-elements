import "../button/button.js";
import { customElement, property } from 'lit/decorators.js'
import './toggle.js'
import { LitElement, html } from "lit";

@customElement('custom-toggle-button')
export class CustomToggleButton extends LitElement {
  @property({ type: Number })
  active: number = 0

  get #toggle() {
    return this.shadowRoot.querySelector('custom-toggle')
  }

  #click = () => {
    this.#toggle.next()
  }

  connectedCallback() {
    this.addEventListener('click', this.#click)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#click)
  }

  #onactive(event: CustomEvent) {
    this.dispatchEvent(new CustomEvent('active', {detail: event.detail}))
  }

  render() {
    return html`
    <custom-button>
      <custom-toggle slot="icon" .active=${this.active} @active=${this.#onactive}>
        <slot></slot>
      </custom-toggle>
    </custom-button>`;
  }
}
