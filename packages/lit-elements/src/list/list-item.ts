import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'

@customElement('custom-list-item')
export class CustomListItem extends LitElement {
  @property({ type: String, reflect: true })
  type: 'menu' | 'one-line' = 'one-line'

  @property({ type: Boolean, reflect: true })
  open: Boolean

  @property({ type: Boolean, reflect: true, attribute: 'has-Start' })
  hasStart: Boolean

  @queryAssignedElements({slot: 'start'})
  assignedStartElements

  @query('slot[name="start"]')
  startSlot

  #startSlotChange = async () => {
    await this.assignedStartElements[0].updateComplete

    // console.log(this.assignedStartElements);
    
    
    // console.log(this.startSlot.assignedElements()[0].getBoundingClientRect());
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

      :host([has-Start]) .body {
        padding-left: 12px;
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
