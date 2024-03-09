import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-shell")
export class AppShell extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  render() {
    return html`
      <custom-theme></custom-theme>

      <slot></slot>
    `;
  }
}
