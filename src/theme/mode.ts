import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import '../icon/icon.js'

@customElement('custom-theme-mode')
export class CustomThemeMode extends LitElement {

  @property({ type: String })
  mode: 'dark' | 'light' = localStorage.getItem('custom-theme-mode') || matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  #switchMode() {
    this.mode = this.mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('custom-theme-mode', this.mode)
    
  }

  render() {
    return html`
    <custom-button @click=${this.#switchMode}>
      <custom-icon slot="icon">
        ${this.mode}_mode
      </custom-icon>
    </custom-button>
    `;
  }
}
