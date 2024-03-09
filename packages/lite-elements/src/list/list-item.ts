import { customElement, LiteElement, css, html, property, query, assignedElements } from '@vandeurenglenn/lite'
@customElement('custom-list-item')
export class CustomListItem extends LiteElement {
  @property({ type: String, reflect: true })
  accessor type: 'menu' | 'one-line' = 'one-line'

  @property({ type: Boolean, reflect: true })
  accessor open: boolean

  @property({ type: Boolean, reflect: true, attribute: 'has-start' })
  accessor hasStart: boolean

  @property({ type: Boolean, reflect: true, attribute: 'non-interactive' })
  accessor nonInteractive: boolean

  @assignedElements('start')
  accessor assignedStartElements

  @query('slot[name="start"]')
  accessor startSlot

  #startSlotChange = () => {
    this.hasStart = true
  }

  connectedCallback() {
    this.startSlot.addEventListener('slotchange', this.#startSlotChange)
  }
  static styles = [
    css`
      * {
        pointer-events: none;
        user-select: none;
      }
      :host {
        display: flex;
        /* top, right, bottom, left */
        padding: 8px 24px 8px 16px;
        box-sizing: border-box;
        width: 100%;
        cursor: pointer;
        min-width: 112px;
        max-width: 280px;
        height: 48px;
        pointer-events: auto;
      }
      :host([type='menu']) {
        padding: 0 12px;
        height: 48px;
      }

      :host([type='menu']),
      :host([type='one-line']) {
        align-items: center;
      }

      :host([has-start]) .body {
        padding-left: 12px;
      }

      :host([non-interactive]) {
        pointer-events: none;
        cursor: default;
      }
    `
  ]

  render() {
    return html`
      <slot name="start"></slot>
      <span class="body">
        <slot></slot>
      </span>
      <flex-it></flex-it>
      <slot name="end"></slot>
    `
  }
}
