import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js'
import { customElement } from 'custom-element-decorator';

@customElement()
export class TimePickerInput extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      
    `
  ];

  render() {
    return html`
    <input type="time">
    `;
  }
}
