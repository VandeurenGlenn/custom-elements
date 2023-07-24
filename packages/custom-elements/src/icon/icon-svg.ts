import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('custom-icon-svg')
export class CustomIconSvg extends LitElement {
  @property()
  svg: string

  @property({type: String})
  icon: string

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.get('icon')) {
      // this.svg = 
    }
  }

  static styles = [
    css`
      :host {
        display: flex;
        --custom-icon-size: 24px;
        height: var(--custom-icon-size);
        width: var(--custom-icon-size);
        align-items: center;
        justify-content: center;
      }

      slot {
        display: flex;
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
        font-family: 'Material Symbols Outlined';
        font-size: var(--custom-icon-size);
        line-height: var(--custom-icon-size);
        height: var(--custom-icon-size);
        width: var(--custom-icon-size);
      }
    `
  ];

  render() {
    return html`
    ${this.svg}
    `;
  }
}
