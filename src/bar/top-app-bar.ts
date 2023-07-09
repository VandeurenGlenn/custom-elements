import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('custom-top-app-bar')
export class CustomTopAppBar extends LitElement {
  
  @property({ type: String, reflect: true })
  type: 'center-aligned' | 'small' | 'medium' | 'large' = 'center-aligned'

  @property({ type: Boolean, reflect: true })
  scrolling: boolean
  
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: calc(100% - 2px);
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);

        padding: 0 16px;
        box-sizing: border-box;
      }

      .container {
        padding: 20px 16px 24px 16px;
        box-sizing: border-box;
        position: relative;
        height: 64px;
      }

      :host([type="center-aligned"]) .container, :host([type="small"]) .container  {
        justify-content: center;
      }

      :host(:not([type="center-aligned"])) ::slotted([name="title"]) {
        padding-left: 16px;
      }

      :host(:not([type="large"])) ::slotted([name="title"]) {
        padding-bottom: 28px;
      }

      :host([type="center-aligned"]) slot[name="title"]::slotted(*) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
      }

      :host([scrolling]) {
        --md-elevation-level: 2;
      }

      flex-row {
        width: 100%;
        align-items: center;
      }

      custom-elevation {
        border-radius: var(--md-sys-shape-corner-large);
      }
    `
  ];

  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('custom-scroll', ({detail}) => {
      this.scrolling = detail.scrolling
    })
  }

  render() {
    return html`
    <flex-column class="container">
      <custom-elevation></custom-elevation>
      <flex-row>
        <slot name="start"></slot>
        <custom-typography>
          <slot name="title"></slot>
        </custom-typography>
        <flex-one></flex-one>
        <slot name="end"></slot>
      </flex-row>
    </flex-column>
    
    `;
  }
}
