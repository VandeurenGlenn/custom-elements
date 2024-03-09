import PubSub from '@vandeurenglenn/little-pubsub'
import { customElement, LiteElement, css, html, property } from '@vandeurenglenn/lite'

globalThis.pubsub = globalThis.pubsub || new PubSub(true)

@customElement('custom-icon')
class Icon extends LiteElement {
  @property()
  accessor host

  @property({ type: String })
  accessor icon = this.innerHTML

  @property()
  accessor setName

  onChange(propertyKey: any, value: any) {
    if (propertyKey === 'setName') {
      this.host = globalThis.pubsub.subscribers[`custom-icon-set-${value}-connected`]?.value
      if (!this.host) {
        globalThis.pubsub.subscribe(`custom-icon-set-${value}-connected`, (host) => {
          if (host) {
            this.host = host
          }
        })
      }
    }

    if (propertyKey === 'icon' || propertyKey === 'host') {
      if (this.host && this.icon) this._icon = this.host.getIcon(this.icon)
    }
  }
  _icon

  static styles = [
    css`
      :host {
        --__custom-icon-size: var(--custom-icon-size, 24px);
        --custom-icon-color: var(--md-sys-color-on-surface);
        display: flex;
        height: var(--custom-icon-size, 24px);
        width: var(--custom-icon-size, 24px);
      }

      svg {
        fill: var(--custom-icon-color);
        height: inherit;
        width: inherit;
        pointer-events: none;
      }
    `
  ]

  connectedCallback() {
    this.setName = this.getAttribute('set-name') || 'icons'
  }
  render() {
    return html` ${this._icon} `
  }
}

export { Icon, Icon as CustomIcon }
