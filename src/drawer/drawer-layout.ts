import { LitElement, html } from "lit";
import { property, query, customElement } from "lit/decorators.js";
import './drawer.js'
import './drawer-button.js'

@customElement('custom-drawer-layout')
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
    </style>
    <span class="scrim" @click=${this.#click}></span>


    <custom-drawer @click=${this.#click} .mobile=${this.mobile} .open=${this.drawerOpen} .type=${this.drawerType}>
      <slot name="drawer-header" slot="header">
        <slot name="drawer-headline" slot="headline"></slot>
      </slot>
      <slot name="drawer-content" slot="content"></slot>
      <slot name="drawer-footer" slot="footer"></slot>
    </custom-drawer>

    <flex-column style="height: 100%;">


    <!--  TODO: do we want a header? -->
    <slot name="header"></slot>

    <slot name="top-app-bar">
      <custom-top-app-bar>
        <slot name="top-app-bar-start" slot="start">
          <slot name="drawer-menu-button">
            <custom-drawer-button @click=${this.#click}>  
              menu
            </custom-drawer-button>
          </slot>
        </slot>
        <slot name="top-app-bar-title" slot="title"></slot>
        <slot name="top-app-bar-end" slot="end"></slot>
      </custom-top-app-bar>
    </slot>
      <main>
        <slot></slot>
      </main>
    </flex-column>
    `;
    
  }
}
