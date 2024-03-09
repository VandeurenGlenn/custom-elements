import { customElement, LiteElement, css, html } from '@vandeurenglenn/lite'

@customElement('custom-time-picker-input')
export class TimePickerInput extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `
  ]

  render() {
    return html` <input type="time" /> `
  }
}
