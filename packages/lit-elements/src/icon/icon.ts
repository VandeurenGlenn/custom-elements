import PubSub from '@vandeurenglenn/little-pubsub';
import { css, html } from '../helpers.js'

globalThis.pubsub = globalThis.pubsub || new PubSub(true)
class Icon extends HTMLElement {
  static get observedAttributes() { return ['icon', 'set-name']; }
  host

  attributeChangedCallback(name, oldValue, value) {
    if (oldValue !== value) this[name === 'set-name' ? 'setName' : name] = value
  }

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
    }
    `
  ]

  get setName() {
    return this.getAttribute('set-name') || 'icons'
  }

  set setName(value) {
      this.setAttribute('set-name', value)
      this.host = globalThis.pubsub.subscribers[`custom-icon-set-${value}-connected`]?.value
      if (this.host) this.observer()
      else {
        globalThis.pubsub.subscribe(`custom-icon-set-${value}-connected`, host => {
          if (host) {
            this.host = host
            this.observer()
          }
        })
      }
  }

  get icon() {
    return this.getAttribute('icon') || this.innerHTML
  }

  set icon(value) {
    this.setAttribute('icon', value)
    this.observer()
  }

  observer() {
    if (this.icon && this.setName && this.host) {
      this.renderIcon()
    }
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    const sheets = []
    for (const style of Icon.styles) {
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(style)
      sheets.push(sheet)
    }
    
    this.shadowRoot.adoptedStyleSheets = sheets
    this.icon = this.icon
    this.setName = this.setName
    this.observer()
  }

  renderIcon() {
    if (!this.icon || !this.host) return
    this.shadowRoot.innerHTML = this.host.getIcon(this.icon)
  }
}

customElements.define('custom-icon', Icon)

export {Icon, Icon as CustomIcon }
