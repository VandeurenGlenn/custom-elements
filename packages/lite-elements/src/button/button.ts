import { customElement, LiteElement, html, property } from '@vandeurenglenn/lite'
import '../elevation/elevation.js'
import style from './styles/button.css.js'

@customElement('custom-button')
export class CustomButton extends LiteElement {
  @property({ attribute: 'has-icon', reflect: true })
  accessor hasIcon: boolean

  @property({ attribute: 'has-label', reflect: true })
  accessor hasLabel: boolean

  @property({ attribute: 'type', reflect: true })
  accessor type: 'elevated' | 'filled' | 'text' | 'tonal' | 'outlined' = 'text'

  @property({ attribute: true })
  accessor label

  static styles = [style]

  firstRender(): void {
    const slots = Array.from(this.shadowRoot.querySelectorAll('slot'))
    for (const slot of slots) {
      slot.addEventListener('slotchange', () => this.#slotchange(slot))
    }

    this.#slotchange(slots[0])
  }

  onChange(propertyKey, value) {
    if (propertyKey === 'label') {
      if (value) this.hasLabel = true
      else this.hasLabel = false
    }
  }

  #slotchange = (slot) => {
    if (slot.getAttribute('name') === 'icon') {
      this.hasIcon = Array.from(slot?.assignedNodes() || []).length !== 0
    }
  }

  render() {
    return html`
      <button label=${this.label}>
        <custom-elevation></custom-elevation>
        <slot name="icon"></slot>
        <span class="label">${this.label}</span>
        <span class="hover"></span>
      </button>
    `
  }
}
