import { customElement, LiteElement, css, html, property } from '@vandeurenglenn/lite'

@customElement('custom-toggle')
export class CustomToggle extends LiteElement {
  @property({ type: Number })
  accessor active: number = 0

  @property({ type: Array })
  accessor togglers: string[]

  @property()
  accessor icon: string

  restartOnEnd: boolean = true

  onChange(propertyKey, value) {
    if (propertyKey === 'active') {
      this.dispatchEvent(new CustomEvent('active', { detail: this.active }))
    }
    if ((propertyKey === 'active' && this.togglers) || (propertyKey === 'togglers' && this.active !== undefined)) {
      this.icon = this.togglers[this.active]
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
        display: contents;
      }
    `
  ]

  render() {
    return html`<custom-icon .icon=${this.icon}></custom-icon>`
  }
}
