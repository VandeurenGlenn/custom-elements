import { customElement } from "custom-element-decorator";
import { LitElement, html } from "lit";
import { property, query } from "lit/decorators.js";
import'../elevation/elevation.js'
import '../button/button.js'
import '../icon/icon.js'

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

  @property({ type: String, reflect: true })
  id: string

  #closePane = (event) => {
    event.stopPropagation()
    this.open = false
    document.dispatchEvent(new CustomEvent(`custom-pane-close`, { detail: this.id || `${this.left ? 'left' : 'right'}`}))
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
        position: relative;
        /* border-radius: 12px; */

        --md-elevation-level: 0;

        pointer-events: none;
        opacity: 0;
        width: 100%;
        max-width: var(--custom-pane-width);
        transition: var(--md-sys-motion-easing-emphasized-accelerate) 200ms opacity, var(--md-sys-motion-easing-emphasized-accelerate) 200ms transform;
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
        transition: var(--md-sys-motion-easing-emphasized-decelerate) 500ms opacity, var(--md-sys-motion-easing-emphasized-decelerate) 500ms transform;
      }

      :host([open]) {
        position: relative;
      }

      :host([open][mobile]) {
        position: fixed;
      }

      aside {
        width: 100%;
        height: 100%;
      }

      .content {
        height: calc(100% - 54px);
        width: 100%;
        overflow-y: auto;
      }

      .footer {
        height: 54px;
      }

      :host([right]) custom-button {
        transform: rotateZ(180deg);
      }
    </style>
    <custom-elevation></custom-elevation>
    <aside>
      <slot name="header">
        <flex-row center>
          <slot name="headline"></slot>
          <flex-it></flex-it>
          <custom-button @click=${this.#closePane}>
            <custom-icon slot="icon">menu_open</custom-icon>
          </custom-button>
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
