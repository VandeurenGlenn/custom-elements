import { customElement } from 'custom-element-decorator';
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js'

@customElement()
export class CustomDrawerItem extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        padding-left: 16px;
        padding-right: 24px;
        height: 100%;
        min-height: 54px;
        width: 100%;
        box-sizing: border-box;
        border-radius: var(--md-sys-shape-corner-extra-large);
        align-items: center;
        pointer-events: auto;
        cursor: pointer;
      }

      slot {
        pointer-events: none;
      }

      slot[name="icon"]::slotted(*) {
        margin-right : 12px;
        height: 24px;
        width: 24px;
      }

      slot[name="end"]::slotted(*) {
        margin-left: 12px;
        box-sizing: border-box;
      }

      :host([non-interactive]) {
        pointer-events: none;
      }
    `
  ];

  render() {
    return html`
    <slot name="icon"></slot>
    <slot></slot>
    <slot name="end"></slot>
    `;
  }
}
