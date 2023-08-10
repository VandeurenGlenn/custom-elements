import { LitElement, html, css } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'

@customElement('text-field')
export class TextField extends LitElement {
  @query('slot[name="leading-icon"]')
  leadingIconSlot

  @query('slot[name="trailing-icon"]')
  trailingIconSlot

  @property({ type: Boolean, reflect: true, attribute: 'has-leading-icon' })
  hasLeadingIcon

  @property({ type: Boolean, reflect: true, attribute: 'has-trailing-icon' })
  hasTrailingIcon


  #leadingIconSlotChange = () => {
    if (this.leadingIconSlot.assignedElements.length > 0) this.hasLeadingIcon = true
    else this.hasLeadingIcon = false
  }

  #trailingIconSlotChange = () => {
    if (this.trailingIconSlot.assignedElements.length > 0) this.hasTrailingIcon = true
    else this.hasTrailingIcon = false
  }

  connectedCallback(): void {
    this.leadingIconSlot.addEventListener('slotchange', this.#leadingIconSlotChange)
    this.trailingIconSlot.addEventListener('slotchange', this.#trailingIconSlotChange)
  }

  static styles = [
    css`
      :host {
        display: block;
      }
      .label {

      }

      :host([has-leading-icon]) {

      }
    `
  ];

  render() {
    return html`
      <slot name="leading-icon"></slot>
    `;
  }
}
