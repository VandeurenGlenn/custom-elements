import { LitElement, html, css, PropertyValueMap, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import '../elevation/elevation.js'
import '../icon/icon-font.js'

@customElement('custom-dialog')
export class CustomDialog extends LitElement {

  @property({ type: Boolean, reflect: true })
  open: boolean = false

  @property({ type: Boolean, reflect: true })
  fullscreen: boolean = false

  @property({ type: Boolean, reflect: true, attribute: 'has-actions' })
  hasActions: boolean = false

  @property({ type: Boolean, reflect: true, attribute: 'has-header' })
  hasHeader: boolean = false

  @property({ type: Boolean, reflect: true, attribute: 'has-hero' })
  hasHero: boolean = false

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(_changedProperties)
    const actionsSlot = this.shadowRoot.querySelector('slot[name="actions"]')
    // @ts-ignore
    this.hasActions = (Array.from(actionsSlot?.assignedNodes() || [])).length !== 0

    let headerSlot = this.shadowRoot.querySelector('slot[name="header"]')
    
    const checks = ['title', 'header-start', 'header-end']
    let i = 0
    // @ts-ignore
    while (Array.from(headerSlot.assignedElements()).length === 0 && i < checks.length) {
      headerSlot = this.shadowRoot.querySelector(`slot[name="${checks[i]}"]`)
      i+=1
    }
    
    // @ts-ignore
    this.hasHeader = headerSlot.assignedElements().length !== 0
    console.log(this.hasHeader);
    

    const heroSlot = this.shadowRoot.querySelector('slot[name="hero-icon"]')
    // @ts-ignore
    this.hashero = (Array.from(heroSlot?.assignedNodes() || [])).length !== 0

    if (_changedProperties.has('open')) {
      this.open ?
        this.querySelector('[slot="actions"]').addEventListener('click', this.#close) :
        this.querySelector('[slot="actions"]').removeEventListener('click', this.#close)
    }
    
  }

  #close = (event: Event) => {
    const target = event.composedPath()[0] as HTMLElement
    this.dispatchEvent(new CustomEvent('close', {detail: target.getAttribute('action') || 'close'}))
    this.open = false
  }

  static styles = [
    css`
      :host {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      .header {
        height: 56px;
        box-sizing: border-box; 
      }

      .scrim, .dialog {
        transition: var(--md-sys-motion-easing-emphasized-accelerate) 200ms opacity, var(--md-sys-motion-easing-emphasized-accelerate) 200ms transform;
      }

      .scrim {
        position: absolute;
        inset: 0;
        background-color: var(--md-sys-color-scrim);
        opacity: 0;
        pointer-events: none;
      }

      dialog {
        pointer-events: none;
        border: none;
        min-width: 280px;
        max-width: 560px;
        width: fit-content;
        border-radius: var(--md-sys-shape-corner-extra-large);
        background-color: var(--md-sys-color-surface-container-high);
        color: var(--md-sys-color-on-surface);
        padding: 24px;
        box-sizing: border-box;
        position: relative;
        opacity: 0;
        transform: scaleY(0.1);
      }

      .body {
        overflow-y: auto;
      }
      
      :host([has-actions]) .body {
        padding-top: 16px;
        padding-bottom: 24px;
      }

      :host([has-header][has-hero]) .header {
        padding-top: 16px;
      }

      slot[name="title"]::slotted(*) {
        font-family: var(--md-sys-typescale-title-large-font-family-name);
        font-style: var(--md-sys-typescale-title-large-font-family-style);
        font-weight: var(--md-sys-typescale-title-large-font-weight);
        font-size: var(--md-sys-typescale-title-large-font-size);
        letter-spacing: var(--md-sys-typescale-title-large-tracking);
        line-height: var(--md-sys-typescale-title-large-height);
        text-transform: var(--md-sys-typescale-title-large-text-transform);
        text-decoration: var(--md-sys-typescale-title-large-text-decoration);
      }

      :host([has-hero]) slot[name="title"]::slotted(*) {
        padding-top: 16px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      :host([fullscreen]) slot[name="title"]::slotted(*) {
        padding-left: 16px;
      }
      
      :host(:not([fullscreen])) dialog {
        align-items: center;
        justify-content: center;
      }

      slot[name="supporting-text"]::slotted(*) {
        color: var(--md-sys-color-on-surface-variant);
        padding-bottom: 16px;
      }

      slot[name="actions"]::slotted(*) {
        align-items: center;
        justify-content: end;
      }

      :host([open]) dialog, :host([open]) .scrim {
        pointer-events: auto;
        opacity: 1;
        transform: scaleY(1);
        transition: var(--md-sys-motion-easing-emphasized-decelerate) 500ms opacity, var(--md-sys-motion-easing-emphasized-decelerate) 500ms transform;
      }

      :host([open]) .scrim {
        opacity: 0.44;
      }

      :host([fullscreen]) slot[name="actions"]::slotted(*) {
        --custom-icon-size: 12px;
        --custom-button-color: var(--md-sys-color-primary);
      }

      slot[name="actions"] {
        align-items: flex-end;
      }
    `
  ];

  render() {
    return html`
    <span class="scrim" @click=${this.#close}></span>
    <dialog ?open=${this.open}>
      <custom-elevation level=${this.fullscreen ? 0 : 3}></custom-elevation>
      <slot name="hero-icon"></slot>
      <slot name="supporting-text"></slot>
      <flex-row class="header" center>
        <slot name="header">
          <flex-row center style="width: 100%">
            <slot name="header-start">
              ${this.fullscreen ? html`<custom-button @click=${this.#close}><custom-icon-font slot="icon">close</custom-icon-font></custom-button>` : nothing}
            </slot>
            <slot name="title"></slot>
            <flex-it></flex-it>
            <slot name="header-end">
              ${this.fullscreen ? html`<slot name="actions"></slot>`: nothing}
              ${this.fullscreen ? nothing : html`<custom-button @click=${this.#close}><custom-icon-font slot="icon">close</custom-icon-font></custom-button>`}
            </slot>
          </flex-row>
        </slot>
      </flex-row>
      <flex-column class="body">
        <slot></slot>
      </flex-column>
      
      ${this.fullscreen ? nothing : html`<slot name="actions"></slot>`}
    </dialog>
    `;
  }
}
