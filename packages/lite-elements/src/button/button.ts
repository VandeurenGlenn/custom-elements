import { customElement, LiteElement, html, property, listen } from '@vandeurenglenn/lite'
import '../elevation/elevation.js'
import style from './styles/button.css.js'

@customElement('custom-button')
export class CustomButton extends LiteElement {
  @property({ attribute: 'has-icon', reflect: true })
  accessor hasIcon: boolean

  @property({ attribute: 'type', reflect: true })
  accessor type: 'elevated' | 'filled' | 'text' | 'tonal' | 'outlined' = 'text'

  @property({ attribute: true })
  accessor label

  @property({ attribute: 'has-label', reflect: true })
  accessor hasLabel: boolean

  static styles = [style]

  firstRender(): void {
    for (const slot of this.shadowRoot.querySelectorAll('slot')) this.#updateSlot(slot)
  }

  onChange(propertyKey, value) {
    if (propertyKey === 'label') this.hasLabel = Boolean(value) || this.#hasSlottedLabel()
  }

  @listen('slotchange', { target: 'slot' })
  onSlotChange(event: Event): void {
    this.#updateSlot(event.target as HTMLSlotElement)
  }

  #updateSlot(slot: HTMLSlotElement) {
    if (slot.getAttribute('name') === 'icon') {
      this.hasIcon = Array.from(slot?.assignedNodes() || []).length !== 0
    } else {
      this.hasLabel = Boolean(this.label) || this.#hasSlottedLabel()
    }
  }

  #hasSlottedLabel(): boolean {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null
    return Boolean(slot?.assignedNodes().some((node) => node.textContent?.trim()))
  }

  render() {
    return html`
      <button type="button" aria-label=${this.label || ''}>
        <custom-elevation></custom-elevation>
        <slot name="icon"></slot>
        <span class="label">${this.label || html`<slot></slot>`}</span>
        <span class="hover"></span>
      </button>
    `
  }
}
