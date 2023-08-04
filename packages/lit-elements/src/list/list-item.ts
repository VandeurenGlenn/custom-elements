import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'

@customElement('custom-list-item')
export class CustomListItem extends LitElement {
  @property({ type: String, reflect: true })
  type: 'menu' | 'one-line' = 'one-line'

  @property({ type: Boolean, reflect: true })
  open: boolean

  @property({ type: Boolean, reflect: true, attribute: 'has-start' })
  hasStart: boolean

  @property({ type: Boolean, reflect: true, attribute: 'non-interactive' })
  nonInteractive: boolean

  @queryAssignedElements({slot: 'start'})
  assignedStartElements

  @query('slot[name="start"]')
  startSlot

  #startSlotChange = async () => {
    await this.assignedStartElements[0].updateComplete
    this.hasStart = true
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.startSlot.addEventListener('slotchange', this.#startSlotChange)
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this.assignedStartElements[0]) this.#startSlotChange()
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
      :host([type="menu"]) {
        padding: 0 12px;
        height: 48px;
      }

      :host([type="menu"]), :host([type="one-line"]) {
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
  ];

  render() {
    return html`
    <slot name="start"></slot>
    <span class="body">
      <slot></slot>
    </span>
    <flex-it></flex-it>
    <slot name="end"></slot>
    `;
  }
}
