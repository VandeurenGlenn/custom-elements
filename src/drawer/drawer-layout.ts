import { LitElement, html } from "lit";
import { property, query, customElement } from "lit/decorators.js";
import './drawer.js'
import './drawer-button.js'
import './drawer-item.js'
import './../bar/top-app-bar.js'
// import { publish, subscribe } from "../decorators/pubsub.js";

@customElement('custom-drawer-layout')
export class CustomDrawerLayout extends LitElement {

  // @subscribe('drawer-open', (value) => {return value})
  @property({ type: Boolean, reflect: true, attribute: 'drawer-open' })
  drawerOpen: boolean = false

  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: String })
  drawerType: 'modal' | undefined = 'modal'
  
  connectedCallback(): void {
    super.connectedCallback()
    const media = matchMedia('(max-width: 860px)')
   
    const mediaQueryChange = ({matches}) => {
      this.mobile = matches
      if (this.mobile) this.drawerOpen = false
      else this.drawerOpen = true
    }

    media.onchange = mediaQueryChange
    mediaQueryChange({ matches: media.matches })

    document.addEventListener('custom-pane-close', () => {
      this.drawerOpen = false
    })
  }

  #click = () => {
    if (this.mobile) this.drawerOpen = !this.drawerOpen
  }

  #toggleDrawer = (event: Event) => {
    event.stopPropagation()
    this.drawerOpen = !this.drawerOpen
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

      :host([drawer-open][mobile]) .scrim {
        z-index: 1000;
        position: fixed;
        inset: 0;
        background-color: var(--md-sys-color-scrim);
        opacity: 0.44;
      }

      custom-drawer {
        --custom-pane-width: var(--custom-drawer-width, 320px);
      }

      :host(:not([mobile])) .middle-pane {
        will-change: width, transform;
        width: calc(100% - var(--custom-drawer-width));
        height: 100%;
        position: absolute;
        transform: translateX(var(--custom-drawer-width));

        transition: var(--md-sys-motion-easing-emphasized-decelerate) 500ms width, var(--md-sys-motion-easing-emphasized-decelerate) 500ms transform;
      }

      :host(:not([drawer-open])) .middle-pane {
        transition: var(--md-sys-motion-easing-emphasized-accelerate) 200ms width, var(--md-sys-motion-easing-emphasized-accelerate) 200ms transform;
        transform: translateX(0);
        width: 100%;
      }

      :host([mobile]) .middle-pane {
        width: 100%;
        transform: 0;
        left: 0;
      }
    </style>
    <span class="scrim" @click=${this.#click}></span>

    
    <slot name="drawer">
      <custom-drawer @click=${this.#click} .mobile=${this.mobile} .open=${this.drawerOpen} .type=${this.drawerType}>
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
        <custom-top-app-bar>
          <slot name="top-app-bar-start" slot="start">
            <slot name="drawer-menu-button">
              <custom-drawer-button @click=${this.#toggleDrawer} .mobile=${this.mobile} ?drawer-open=${this.drawerOpen}>
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
    </flex-column>
    `;
    
  }
}
