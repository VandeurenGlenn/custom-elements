import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'
import './button.js'
import './../icon/icon.js'

@customElement('custom-icon-button')
export class CustomIconButton extends LiteElement {
  @property({ type: String })
  accessor icon: string

  static styles = [
    css`
      :host {
        --custom-button-border-radius: var(--md-sys-shape-corner-medium);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--custom-button-border-radius);
        width: 40px;
        height: 40px;
        cursor: pointer;
      }

      .hover,
      custom-icon,
      custom-elevation {
        pointer-events: none;
      }

      .hover {
        position: absolute;
        inset: 0;
        background-color: var(--md-sys-color-primary);
        opacity: 0;
        transition: opacity 200ms;
        border-radius: var(--custom-button-border-radius);
      }

      :host(:focus) .hover,
      :host(:hover) .hover {
        opacity: 0.1;
      }

      :host(:active) .hover {
        opacity: 0.2;
      }

      custom-elevation {
        --md-elevation-level: var(--elevation-level);
      }

      :host([type='elevated']) custom-elevation {
        --elevation-level: 1;
      }

      :host(:active) {
        --elevation-level: 0;
      }

      custom-icon {
        --custom-icon-color: var(--md-sys-color-on-surface);
      }
    `
  ]

  render() {
    return html`
      <custom-elevation></custom-elevation>

      <custom-icon slot="icon" .icon=${this.icon}></custom-icon>

      <span class="hover"></span>
    `
  }
}
