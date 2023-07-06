import { customElement } from "custom-element-decorator";
import { LitElement, html } from "lit";
import { property, query } from "lit/decorators.js";
import'./../elevation/elevation.js'

@customElement()
export class CustomDrawer extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false

  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: String, reflect: true })
  type: 'modal' | undefined

  render() {
    return html`<style>
      :host {
        --custom-drawer-width: 360px;
        display: flex;
        flex-direction: row;
        height: 100%;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        background-blend-mode: hue;
        position: relative;
        /* border-radius: 12px; */

        border-radius: var(--md-sys-shape-corner-large-end);

        --md-elevation-level: 0;

        pointer-events: none;
        opacity: 0;
        transform: translateX(-110%);
        width: 100%;
        max-width: var(--custom-drawer-width);

      }

      :host([mobile]) {
        top: 0;
        position: fixed;
        z-index: 1001;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
      }

      :host([type="modal"]) {
        --md-elevation-level: 1;
      }

      .container {
        box-sizing: border-box;
        padding: 12px 24px;
        height: 100%;
        width: 100%;
      }

      :host([open]) {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
        /* transition: ; */
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
    <custom-elevation></custom-elevation>
    <aside>
      <flex-column class="container">
        <slot name="header">
          <slot name="headline"></slot>
        </slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>  
      </flex-column>
    </aside>
    
    `;
    
  }
}
