import { customElement, LiteElement, css, html, property, query, listen } from '@vandeurenglenn/lite'

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

  @listen('slotchange', { target: 'slot[name="leading-icon"]' })
  onLeadingIconSlotChange(): void {
    if (this.leadingIconSlot.assignedElements.length > 0) this.hasLeadingIcon = true
    else this.hasLeadingIcon = false
  }

  @listen('slotchange', { target: 'slot[name="trailing-icon"]' })
  onTrailingIconSlotChange(): void {
    if (this.trailingIconSlot.assignedElements.length > 0) this.hasTrailingIcon = true
    else this.hasTrailingIcon = false
  }

  firstRender(): void {
    this.onLeadingIconSlotChange()
    this.onTrailingIconSlotChange()
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
