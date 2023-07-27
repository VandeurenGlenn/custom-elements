import "../button/button.js";
import { html } from './../helpers.js';
import { customElement } from 'lit/decorators.js'
import './toggle.js'

@customElement('custom-toggle-button')
export class CustomToggleButton extends HTMLElement {
  
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.render()
  }

  get #toggle() {
    return this.shadowRoot.querySelector('custom-toggle')
  }

  #click = () => {
    console.log('cl');
    
    this.#toggle.next()
  }

  connectedCallback() {
    this.addEventListener('click', this.#click)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#click)
  }

  render() {
    return html`
    <custom-button>
      <custom-toggle slot="icon">
        <slot></slot>
      </custom-toggle>
    </custom-button>`;
  }
}
