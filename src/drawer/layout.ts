import { customElement } from "custom-element-decorator";
import { LitElement, html } from "lit";
import { property, query } from "lit/decorators.js";
import './drawer.js'
import './drawer-button.js'

@customElement()
export class CustomDrawerLayout extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'drawer-open' })
  drawerOpen: boolean = false

  @property({ type: Boolean, reflect: true })
  mobile: boolean = false

  @property({ type: String })
  drawerType: 'modal' | undefined = 'modal'
  
  connectedCallback(): void {
    super.connectedCallback()
    const media = matchMedia('(max-width: 720px)')
   
    const mediaQueryChange = ({matches}) => {
      this.mobile = matches
      if (this.mobile) this.drawerOpen = false
      else this.drawerOpen = true
    }

    media.onchange = mediaQueryChange
    mediaQueryChange({ matches: media.matches })
  }

  #click = () => {
    if (this.mobile) this.drawerOpen = !this.drawerOpen
  }

  render() {
    return html`<style>
      :host {
        --custom-drawer-width: 360px;
        display: flex;
        flex-direction: row;
        inset: 0;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        background-blend-mode: hue;
        position: absolute;
        --md-elevation-level: 0;
      }

      ::slotted(*) {
        pointer-events: none;
      }

      main {
        width: 100%;
        overflow-y: auto;
      }

      :host([drawer-open]:not([mobile])) main {
        width: calc(100% - var(--custom-drawer-width));
      }

      :host([drawer-open][mobile]) .scrim {
        z-index: 1000;
        position: fixed;
        inset: 0;
        background-color: var(--md-sys-color-scrim);
        opacity: 0.44;
      }
    </style>
    <custom-drawer @click=${this.#click} .mobile=${this.mobile} .open=${this.drawerOpen} .type=${this.drawerType}>
      <slot name="drawer-header" slot="header">
        <slot name="drawer-headline" slot="headline"></slot>
      </slot>
      <slot name="drawer-content" slot="content"></slot>
      <slot name="drawer-footer" slot="footer"></slot>
    </custom-drawer>
    
    <span class="scrim" @click=${this.#click}></span>
    <main>

      <custom-drawer-button @click=${this.#click}>
        menu
      </custom-drawer-button>
      <slot></slot>
    </main>
    `;
    
  }
}
