import { customElement } from "custom-element-decorator";
import { LitElement, html } from "lit";

@customElement()
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
      }
      
      slot {
        pointer-events: none;
      }
    </style>
    <slot></slot>
    `;
  }
}
