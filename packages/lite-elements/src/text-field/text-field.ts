import { customElement, LiteElement, css, html, property, query } from '@vandeurenglenn/lite'

@customElement('text-field')
export class TextField extends LiteElement {
  @query('slot[name="leading-icon"]')
  accessor leadingIconSlot

  @query('slot[name="trailing-icon"]')
  accessor trailingIconSlot

  @property({ type: Boolean, reflect: true, attribute: 'has-leading-icon' })
  accessor hasLeadingIcon

  @property({ type: Boolean, reflect: true, attribute: 'has-trailing-icon' })
  accessor hasTrailingIcon

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
  ]

  render() {
    return html` <slot name="leading-icon"></slot> `
  }
}
