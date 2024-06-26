import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('custom-tab')
export class CustomTab extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 40px;
          padding: 0 12px;
          box-sizing: border-box;
          width: auto;
          font: var(--_supporting-text-type);
          cursor: pointer;
          white-space: nowrap;
        }

        slot {
          pointer-events: none;
        }
      </style>
      <slot></slot>
    `
  }
}
