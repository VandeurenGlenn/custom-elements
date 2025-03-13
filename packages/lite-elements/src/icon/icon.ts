import PubSub from '@vandeurenglenn/little-pubsub'
import { customElement, LiteElement, css, html, property } from '@vandeurenglenn/lite'

globalThis.pubsub = globalThis.pubsub || new PubSub(true)

@customElement('custom-icon')
export class CustomIcon extends LiteElement {
  @property()
  accessor host

  @property({ attribute: true, reflect: true })
  accessor icon

  @property()
  accessor setName

  @property()
  accessor _icon

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

  static styles = [
    css`
      :host {
        display: flex;
        height: var(--custom-icon-size, 24px);
        width: var(--custom-icon-size, 24px);
      }

      svg {
        fill: var(--custom-icon-color, var(--md-sys-color-on-surface));
        height: inherit;
        width: inherit;
        pointer-events: none;
      }
    `
  ]

  beforeRender(): void {
    this.setName = this.getAttribute('set-name') || 'icons'
  }

  render() {
    return html` ${this._icon} `
  }
}
