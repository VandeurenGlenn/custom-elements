import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import PubSub from '@vandeurenglenn/little-pubsub';
globalThis.pubsub = globalThis.pubsub || new PubSub(true)

@customElement('custom-icon-set')
export class CustomIconSet extends HTMLElement {
  static styles = [
    css`
      :host {
        display: none;
      }
    `
  ];

  constructor() {
    super()
  }

  #getIcon(name) {
    return this.querySelector('template').content.querySelector(`span[name="${name}"]`) as HTMLTemplateElement
  }

  getIcon(name: string) {
    const node = this.#getIcon(name)
    if (!node) {
      console.warn(`missing icon ${name}`);
      return name
    }
    return node.innerHTML
  }

  get setName() {
    return this.getAttribute('set-name') || 'icons'
  }

  connectedCallback() {
    globalThis.pubsub.subscribe(`custom-icon-set-${this.setName}-connected`, () => {})
    globalThis.pubsub.publish(`custom-icon-set-${this.setName}-connected`, this)
    
  }
}
