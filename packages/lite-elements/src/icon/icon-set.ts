import { customElement, LiteElement, css } from '@vandeurenglenn/lite'
import PubSub from '@vandeurenglenn/little-pubsub'
globalThis.pubsub = globalThis.pubsub || new PubSub(true)

@customElement('custom-icon-set')
export class CustomIconSet extends LiteElement {
  static styles = [
    css`
      :host {
        display: none;
      }
    `
  ]

  #getIcon(name) {
    return this.querySelector('template').content.querySelector(`span[name="${name}"]`)?.children[0]
  }

  getIcon(name: string) {
    const node = this.#getIcon(name)
    if (!node) {
      console.warn(`missing icon ${name}`)
      return name
    }
    return node.cloneNode(true)
  }

  get setName() {
    return this.getAttribute('set-name') || 'icons'
  }

  connectedCallback() {
    globalThis.pubsub.subscribe(`custom-icon-set-${this.setName}-connected`, () => {})
    globalThis.pubsub.publish(`custom-icon-set-${this.setName}-connected`, this)
  }
}
