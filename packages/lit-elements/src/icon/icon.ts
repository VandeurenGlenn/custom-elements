import { html } from '../helpers.js'

class Icon extends HTMLElement {
  static get observedAttributes() { return ['icon']; }

  attributeChangedCallback(name, oldValue, value) {
    if (oldValue !== value) this[name] = value
    if (name === 'icon') this.shadowRoot.innerHTML = this.render()
  }
  get getIconTemplate() {
    return document.querySelector(`template[id="${this.icon}"]`) as HTMLTemplateElement
  }

  get iconTemplateContent() {
    return this.getIconTemplate.content.cloneNode(true)
  }

  get iconTemplateTextContent() {
    return this.iconTemplateContent.children[0].outerHTML
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    
  }
  connectedCallback() {
    this.icon = this.getAttribute('icon') || this.innerHTML
  }

  set icon(value) {
    this.icon !== value && this.setAttribute('icon', value)
  }

  get icon() {
    return this.getAttribute('icon')
  }

  #renderIcon = () => {
    if (this.getIconTemplate) return this.icon ? html`
      <span class="icon">${this.iconTemplateTextContent}</span>
    ` : ''

    console.warn(`icon not included: ${this.icon}
      be sure to add the tag to your index.html @symbol-${this.icon}`)
    
    return ''
  }

  render() {
    return html`
      <style>
        :host {
          --__custom-icon-size: var(--custom-icon-size, 24px);
          --__custom-icon-color: var(--md-sys-color-on-surface);
          display: flex;
          fill: var(--__custom-icon-color, --md-sys-color-on-surface);
          color: var(--__custom-icon-color, --md-sys-color-on-surface);
          height: var(--__custom-icon-size);
          width: var(--__custom-icon-size);
        }

        svg {
          fill: var(--__custom-icon-color, --md-sys-color-on-surface);
          height: var(--__custom-icon-size);
          width: var(--__custom-icon-size);
        }
      </style>

      ${this.#renderIcon()}
    `
  }
}

customElements.define('custom-icon', Icon)

export {Icon, Icon as CustomIcon }
