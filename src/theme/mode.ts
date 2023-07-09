import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import '../icon/icon.js'

@customElement('custom-theme-mode')
export class CustomThemeMode extends LitElement {
  @property({ type: String })
  _icon: string

  @property({ type: String })
  mode: 'dark' | 'light'

  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  async connectedCallback(): void {
    super.connectedCallback()
    this.mode = localStorage.getItem('custom-theme-mode') || matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
    this._icon = `${this.mode}_mode`
  }

  #switchMode() {
    this.mode = this.mode === 'light' ? 'dark' : 'light'
    this._icon = `${this.mode}_mode`
    localStorage.setItem('custom-theme-mode', this.mode)
    
  }

  render() {
    return html`
    <custom-button @click=${this.#switchMode}>
      <custom-icon slot="icon">
        ${this._icon}
      </custom-icon>
    </custom-button>
    `;
  }
}
