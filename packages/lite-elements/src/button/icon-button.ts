import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'
import './button.js'
import './../icon/icon.js'
import { CustomButton } from './button.js'

@customElement('custom-icon-button')
export class CustomIconButton extends CustomButton {
  @property({ type: String })
  accessor icon: string

  static styles = [
    ...CustomButton.styles,
    css`
      :host {
        --custom-button-border-radius: var(--md-sys-shape-corner-medium);
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
      }

      :host([type='text']) {
        --custom-icon-color: var(--md-sys-color-on-surface);
      }

      :host([type='filled']),
      :host([type='filled']) ::slotted(*) {
        --custom-icon-color: var(--md-sys-color-on-primary);
      }

      :host([type='outlined']),
      :host([type='outlined']) ::slotted(*) {
        --custom-icon-color: var(--md-sys-color-on-surface);
      }

      :host([type='elevated']),
      :host([type='elevated']) ::slotted(*) {
        --custom-icon-color: var(--md-sys-color-primary);
      }

      :host([type='tertiary']),
      :host([type='tertiary']) ::slotted(*) {
        --custom-icon-color: var(--md-sys-color-on-tertiary);
      }

      :host([type='tonal']),
      :host([type='tonal']) ::slotted(*) {
        --custom-icon-color: var(--md-sys-color-on-secondary-container);
      }
    `
  ]

  render() {
    return html`
      <button label=${this.label || this.icon}>
        <custom-elevation></custom-elevation>
        <slot name="icon"> <custom-icon .icon=${this.icon || this.label}></custom-icon></slot>
        <span class="label">${this.label}</span>
        <span class="hover"></span>
      </button>
    `
  }
}
