import { html } from '../helpers.js'

class IconFont extends HTMLElement {
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
    return this.iconTemplateContent.textContent
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
        }
        .icon {
          display: flex;
          font-variation-settings:
          'FILL' 0,
          'wght' 400,
          'GRAD' 0,
          'opsz' 48;
          font-family: 'Material Symbols Outlined';
          font-size: var(--__custom-icon-size);
          line-height: var(--__custom-icon-size);
          height: var(--__custom-icon-size);
          width: var(--__custom-icon-size);
        }
      </style>

      ${this.#renderIcon()}
    `
  }
}

customElements.define('custom-icon-font', IconFont)

export {IconFont, IconFont as CustomIconFont }
