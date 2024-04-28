import { customElement, LiteElement, css, html, property, query, assignedElements } from '@vandeurenglenn/lite'
import '../elevation/elevation.js'
import '../button/icon-button.js'
import '../icon/icon.js'

@customElement('custom-pane')
export class CustomPane extends LiteElement {
  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false

  @property({ type: Boolean, reflect: true })
  accessor mobile: boolean = false

  @property({ type: String, reflect: true })
  accessor type: 'modal' | undefined

  @property({ type: Boolean, reflect: true })
  accessor left: boolean = true

  @property({ type: Boolean, reflect: true })
  accessor right: boolean = false

  @property({ type: String })
  accessor id: string

  closePane(event) {
    event.stopPropagation()
    this.open = false
    document.dispatchEvent(
      new CustomEvent(`custom-pane-close`, { detail: this.id || `${this.left ? 'left' : 'right'}` })
    )
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
          transition: var(--md-sys-motion-easing-emphasized-accelerate) 200ms opacity,
            var(--md-sys-motion-easing-emphasized-accelerate) 200ms transform;

          --custom-pane-footer-height: 54px;
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

        :host([type='modal']) {
          --md-elevation-level: 1;
        }

        :host([open]) {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
          transition: var(--md-sys-motion-easing-emphasized-decelerate) 500ms opacity,
            var(--md-sys-motion-easing-emphasized-decelerate) 500ms transform;
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
          height: calc(100% - var(--custom-pane-footer-height));
          width: 100%;
          overflow-y: auto;
        }

        .footer {
          height: var(--custom-pane-footer-height);
        }

        :host([right]) custom-icon-button {
          transform: rotateZ(180deg);
        }
      </style>
      <custom-elevation></custom-elevation>
      <aside>
        <slot name="header">
          <flex-row center>
            <slot name="headline"></slot>
            <flex-it></flex-it>
            <custom-icon-button @click=${(e) => this.closePane(e)} .id=${this.id} icon="menu_open">
            </custom-icon-button>
          </flex-row>
        </slot>
        <flex-column class="content">
          <slot name="content"></slot>
        </flex-column>
        <flex-row class="footer">
          <slot name="footer"></slot>
        </flex-row>
      </aside> `
  }
}
