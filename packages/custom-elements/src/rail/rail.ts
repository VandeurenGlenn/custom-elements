import { customElement } from "custom-element-decorator";
import { LitElement, html } from "lit";
import { property, query } from "lit/decorators.js";
import '../pane/pane.js'

@customElement()
export class CustomRail extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false

  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: String, reflect: true })
  type: 'modal' | undefined

  @property({ type: Boolean })
  right: boolean = false

  render() {
    return html`<style>
      :host {
        display: contents;
      }

      custom-pane {
        box-sizing: border-box;
        padding: 12px 24px;
        height: 100%;
        --custom-pane-width: var(--custom-drawer-with, 320px)
      }

      slot[name="headline"]::slotted(*) {
        color: var(--md-sys-color-on-surface-variant);
        font-family: var(--md-sys-typescale-title-small-font-family-name);
        font-style: var(--md-sys-typescale-title-small-font-family-style);
        font-weight: var(--md-sys-typescale-title-small-font-weight);
        font-size: var(--md-sys-typescale-title-small-font-size);
        letter-spacing: var(--md-sys-typescale-title-small-tracking);
        line-height: var(--md-sys-typescale-title-small-height);
        text-transform: var(--md-sys-typescale-title-small-text-transform);
        text-decoration: var(--md-sys-typescale-title-small-text-decoration);
        text-transform: capitalize;
        margin: 0;
      }

      ::slotted([slot="footer"]) {
        display: block;
        box-sizing: border-box;
        min-height: 48px;
        border-top: 1px solid rgba(0, 0, 0, 0.14);
      }

      ::slotted([slot="content"]) {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow-y: auto;
      }

      ::slotted(*) {
        pointer-events: none;
      }

      aside {
        width: 100%;
      }
    </style>

    <custom-pane .open=${this.open} .mobile=${this.mobile} .type=${this.type}>
      <slot name="header">
        <slot name="headline" slot="headline"></slot>
        <slot name="menu-button" slot="menu-button"></slot>
      </slot>
      <slot name="content" slot="content"></slot>
      <slot name="footer" slot="footer"></slot>
    </custom-pane>
    
    `;
    
  }
}
