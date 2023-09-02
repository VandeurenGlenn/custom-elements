import { LitElement, PropertyValueMap, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js'

@customElement('custom-toggle')
export class CustomToggle extends LitElement {
  restartOnEnd: boolean = true

  @property({ type: Number })
  active: number = 0

  @property({ type: Array })
  togglers: string[]

  @state()
  icon: string

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('active') && this.togglers !== undefined || _changedProperties.has('togglers') && this.active !== undefined) {
      this.icon = this.togglers[this.active]
    }
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('active')) {
      this.dispatchEvent(new CustomEvent('active', { detail: this.active }))
    }
  }
  async next() {
    if (this.active < this.togglers.length - 1) this.active += 1
    else if (this.restartOnEnd) this.active = 0
  }

  previous() {
    if (this.active !== 0) this.active -= 1
  }

  static styles = [
    css`
      :host {
        display: contents
      }
    `
  ];
  
  render() {
    return html`<custom-icon .icon=${this.icon}></custom-icon>`
  }
}
