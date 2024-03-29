import { css, html } from '@vandeurenglenn/lite'
import { SelectBase } from '../mixins/select-mixin.js'

/**
 * @extends HTMLElement
 */
export class CustomPages extends SelectBase {
  async connectedCallback() {
    super.connectedCallback && (await super.connectedCallback())
    this.slotchange = this.slotchange.bind(this)
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.slotchange)
    this.slotchange()
    this.selected = this.defaultSelected
  }

  isEvenNumber(number) {
    return Boolean(number % 2 === 0)
  }

  /**
   * set animation class when slot changes
   */
  slotchange() {
    let call = 0
    for (const child of this.slotted.assignedNodes()) {
      if (child && child.nodeType === 1) {
        child.style.zIndex = 99 - call
        if (this.isEvenNumber(call++)) {
          child.classList.add('animate-down')
        } else {
          child.classList.add('animate-up')
        }
        this.dispatchEvent(new CustomEvent('child-change', { detail: child }))
      }
    }
  }

  static styles = [
    css`
      :host {
        flex: 1;
        position: relative;
        --primary-background-color: #eceff1;
        overflow: hidden;
        height: 100%;
        width: 100%;
      }
      ::slotted(*) {
        display: flex;
        position: absolute;
        opacity: 0;
        pointer-events: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: var(--md-sys-motion-easing-emphasized-accelerate) 200ms opacity,
          var(--md-sys-motion-easing-emphasized-accelerate) 200ms transform;
        /*transform: scale(0.1);*/
        transform-origin: left;
      }
      ::slotted(.animate-up) {
        transform: translateY(-120%);
      }
      ::slotted(.animate-down) {
        transform: translateY(120%);
      }
      ::slotted(.custom-selected) {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
        transition: var(--md-sys-motion-easing-emphasized-decelerate) 500ms width,
          var(--md-sys-motion-easing-emphasized-decelerate) 500ms transform;
        max-height: 100%;
        max-width: 100%;
      }
    `
  ]

  render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `
  }
}

// @ts-ignore
customElements.define('custom-pages', CustomPages)
