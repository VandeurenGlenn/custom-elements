import { customElement } from "custom-element-decorator";
import { LitElement, html } from "lit";
import { property, query } from "lit/decorators.js";
import'./../elevation/elevation.js'

@customElement()
export class CustomPane extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false

  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: String, reflect: true })
  type: 'modal' | undefined

  @property({ type: Boolean, reflect: true })
  left: boolean = true

  @property({ type: Boolean, reflect: true })
  right: boolean = false

  #closePane = (event) => {
    event.stopPropagation()
    this.open = false
    document.dispatchEvent(new CustomEvent(`custom-pane-close`, { detail: `${this.left ? 'left' : 'right'}`}))
  }

  render() {
    return html`<style>
      :host {
        --custom-pane-width: 100%;
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        position: fixed;
        /* border-radius: 12px; */

        --md-elevation-level: 0;

        pointer-events: none;
        opacity: 0;
        width: 100%;
        max-width: var(--custom-pane-width);
        transition: var(--md-sys-motion-easing-emphasized-decelerate) 200ms opacity, var(--md-sys-motion-easing-emphasized-decelerate) 200ms transform;
      }

      :host([left]) {
        border-radius: var(--md-sys-shape-corner-large-end);
        transform: translateX(-100%);
        z-index: 1002;
      }

      :host([right]) {
        border-radius: var(--md-sys-shape-corner-large-start);
        transform: translateX(100%);
        z-index: 1001;
      }

      :host([mobile]) {
        inset: 0;
        position: fixed;
        z-index: 1001;
      }

      :host([type="modal"]) {
        --md-elevation-level: 1;
      }

      :host([open]) {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
        transition: var(--md-sys-motion-easing-emphasized-accelerate) 500ms opacity, var(--md-sys-motion-easing-emphasized-accelerate) 500ms transform;
      }

      :host([open]:not(:host([mobile]))) {
        position: relative;
      }

      aside {
        width: 100%;
        height: 100%;
      }

      .content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
      }

      .footer {
        height: 54px;
      }

      :host([right]) custom-icon-button {
        transform: rotateZ(180deg);
      }
    </style>
    <custom-elevation></custom-elevation>
    <aside>
      <slot name="header">
        <flex-row>
          <slot name="headline"></slot>
          <flex-it></flex-it>
          <custom-icon-button @click=${this.#closePane}>
            menu_open
          </custom-icon-button>
        </flex-row>
      </slot>
      <flex-column class="content">
        <slot name="content"></slot>
      </flex-column>
      <flex-row class="footer">
        <slot name="footer"></slot>
      </flex-row>
    </aside>
    
    `;
    
  }
}
