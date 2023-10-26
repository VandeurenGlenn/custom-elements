import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import './input.js'
@customElement('custom-time-picker')
export class CustomTimePicker extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <time-picker-input></time-picker-input>
			 <div class="am-pm">
			 	 <span class="flex"></span>
			 	 <div class="am">am</div>
				 <span class="flex-2"></span>
				 <div class="pm">pm</div>
				 <span class="flex"></span>
			 </div>
       <time-picker-hour-plate></time-picker-hour-plate>
       <time-picker-minutes-plate></time-picker-minutes-plate>
			 <div class="actions">
        <button class="cancel">cancel</button>
        <span class="flex"></span>
        <button class="ok">ok</button>
			 </div>
    `;
  }
}
