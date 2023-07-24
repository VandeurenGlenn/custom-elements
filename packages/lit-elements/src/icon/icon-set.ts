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

  #getIconTemplate(name) {
    
    
    return this.querySelector(`template[name="${name}"]`) as HTMLTemplateElement
  }

  getIcon(name: string) {
    console.log({name});
    
    return this.#getIconTemplate(name).content.cloneNode(true).textContent
  }

  connectedCallback() {
    console.log('con');
    globalThis.pubsub.subscribe('custom-icon-set-connected', () => {})
    globalThis.pubsub.publish('custom-icon-set-connected', this)
    
  }
}
