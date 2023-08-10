import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import './button.js'
import './../icon/icon.js'

@customElement('custom-icon-button')
export class CustomIconButton extends LitElement {
  @property({ type: String })
  icon: string

  static styles = [
    css`
      :host {
        display: block;
      }

      custom-icon {
        --custom-icon-color: var(--md-sys-color-on-surface);
      }
    `
  ];

  render() {
    return html`
    <custom-button>
      <custom-icon slot="icon" .icon=${this.icon}></custom-icon>
    </custom-button>
    `;
  }
}
