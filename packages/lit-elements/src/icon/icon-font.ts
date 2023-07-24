import { html } from '../helpers.js'

class IconFont extends HTMLElement {
  static get observedAttributes() { return ['icon']; }

  attributeChangedCallback(name, oldValue, value) {
    if (oldValue !== value) this[name] = value
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
    this.icon = this.getAttribute('icon') || this.innerHTML
  }

  set icon(value) {
    if (this.icon !== value) {
      this.setAttribute('icon', value)
      this.shadowRoot.innerHTML = this.render()
    }
  }

  get icon() {
    return this.getAttribute('icon')
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

      <span class="icon">${this.iconTemplateTextContent}</span>
    `
  }
}

customElements.define('custom-icon-font', IconFont)

export {IconFont, IconFont as CustomIconFont }
