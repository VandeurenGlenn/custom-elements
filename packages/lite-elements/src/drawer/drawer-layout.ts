import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'
import './drawer.js'
import './drawer-button.js'
import './drawer-item.js'
import '../bar/top-app-bar.js'
import { AppBarTypes } from '../bar/top-app-bar.js'
import '@vandeurenglenn/flex-elements/column.js'
// import { publish, subscribe } from "../decorators/pubsub.js";

@customElement('custom-drawer-layout')
export class CustomDrawerLayout extends LiteElement {
  // @subscribe('drawer-open', (value) => {return value})
  @property({ type: Boolean, reflect: true, attribute: 'drawer-open' })
  accessor drawerOpen: boolean = false

  @property({ type: Boolean, reflect: true, attribute: 'keep-closed' })
  accessor keepClosed: boolean = false

  @property({ type: Boolean, reflect: true })
  accessor narrow: boolean = false

  @property({ type: String })
  accessor drawerType: 'modal' | undefined = 'modal'

  @property({ type: String })
  accessor appBarType: AppBarTypes = 'center-aligned'

  @property({ type: String })
  accessor mainDrawerId: string = crypto.randomUUID()

  @property({attribute: 'mobile-trigger'}) accessor mobileTrigger = '(max-width: 860px)'

  onChange(propertyKey: string, value: any): void {
    if (propertyKey === 'mobileTrigger') {
      const media = matchMedia(value)
      this._onnarrow({ detail: media.matches })
    }
  }
  connectedCallback(): void {    
    document.addEventListener('custom-pane-close', ({ detail }: CustomEvent) => {
      if (this.mainDrawerId === detail) this.drawerOpen = false
    })

    document.addEventListener('custom-pane-open', ({ detail }: CustomEvent) => {
      if (this.mainDrawerId === detail && !this.keepClosed) this.drawerOpen = true
    })

    document.addEventListener('custom-theme-narrow', this._onnarrow.bind(this))
  }

  _onnarrow({ detail }: CustomEvent) {
    this.narrow = detail
    if (this.keepClosed) return (this.drawerOpen = false)
    if (detail) this.drawerOpen = false
    else this.drawerOpen = true
  }

  private _click = () => {
    if (this.narrow) this.drawerOpen = !this.drawerOpen
  }

  render() {
    return html`<style>
        :host {
          --custom-drawer-width: 320px;
          display: flex;
          flex-direction: row;
          inset: 0;
          background: var(--md-sys-color-surface);
          color: var(--md-sys-color-on-surface);
          background-blend-mode: hue;
          position: absolute;
          box-sizing: border-box;
        }

        main {
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }

        :host([drawer-open][narrow]) .scrim {
          z-index: 1000;
          position: fixed;
          inset: 0;
          background-color: var(--md-sys-color-scrim);
          opacity: 0.44;
        }

        custom-drawer {
          --custom-pane-width: var(--custom-drawer-width, 320px);
        }

        :host(:not([narrow])) .middle-pane {
          will-change: width, transform;
          width: calc(100% - var(--custom-drawer-width));
          height: 100%;
          position: absolute;
          transform: translateX(var(--custom-drawer-width));

          transition: var(--md-sys-motion-easing-emphasized-decelerate) 500ms width,
            var(--md-sys-motion-easing-emphasized-decelerate) 500ms transform;
        }

        :host(:not([drawer-open])) .middle-pane {
          transition: var(--md-sys-motion-easing-emphasized-accelerate) 200ms width,
            var(--md-sys-motion-easing-emphasized-accelerate) 200ms transform;
          transform: translateX(0);
          width: 100%;
        }

        :host([narrow]) .middle-pane {
          width: 100%;
          transform: 0;
          left: 0;
        }
      </style>
      <span class="scrim" @click=${this._click}></span>

      <slot name="drawer">
        <custom-drawer
          @click=${this._click}
          .mobile=${this.narrow}
          .open=${this.drawerOpen}
          .type=${this.drawerType}
          .id=${this.mainDrawerId}
        >
          <slot name="drawer-headline" slot="headline"></slot>
          <slot name="drawer-menu-button" slot="menu-button"></slot>
          <slot name="drawer-content" slot="content"></slot>
          <slot name="drawer-footer" slot="footer"></slot>
        </custom-drawer>
      </slot>

      <flex-column class="middle-pane">
        <!--  TODO: do we want a header? -->
        <slot name="header"></slot>

        <slot name="top-app-bar">
          <custom-top-app-bar .type=${this.appBarType}>
            <slot name="top-app-bar-start" slot="start">
              <slot name="drawer-menu-button">
                <custom-drawer-button .mobile=${this.narrow} ?drawer-open=${this.drawerOpen} .id=${this.mainDrawerId}>
                  menu
                </custom-drawer-button>
              </slot>
            </slot>
            <slot name="top-app-bar-title" slot="title"></slot>
            <slot name="top-app-bar-end" slot="end"></slot>
          </custom-top-app-bar>
        </slot>

        <slot name="content">
          <main>
            <slot></slot>
          </main>
        </slot>
      </flex-column> `
  }
}
