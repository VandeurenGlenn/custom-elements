import { provide } from '@lit-labs/context'
import { customElement } from 'custom-element-decorator'
import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

declare type RelType = 'stylesheet' | 'preconnect'

// @material-symbols

@customElement()
export class CustomTheme extends LitElement {
  @property({ type: Boolean })
  loadFont: boolean = true

  @property({ type: String, attribute: 'mobile-trigger' })
  narrowTrigger: string = '(max-width: 860px)'

  @property({ type: Boolean })
  narrow: boolean

  #loadLink(href, rel: RelType, attributes?: string[]) {
    let link = document.createElement('link')

    link.rel = rel
    link.href = href
    if (attributes) {
      for (const attribute of attributes) {
        link.setAttribute(attribute, '')
      }
    }
    document.head.appendChild(link)
  }

  #generateSymbolsLink() {
    let link =
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap'
    if (globalThis.symbols) {
      link += `&text=${globalThis.symbols}`
    }
    return link
  }

  constructor() {
    super()
    const media = matchMedia('(max-width: 860px)')

    media.onchange = this.#mediaQueryChange
    this.#mediaQueryChange({ matches: media.matches })

    // this.load('./themes/default/tokens.js')
    this.load(this.hasAttribute('theme-link') ? this.getAttribute('theme-link') : './themes/default/theme.css')
    const style = document.createElement('style')
    style.innerHTML = `
    html, body {
      inset: 0;
      position: absolute;
      margin: 0;
      background: var(--md-sys-color-background);
      color: var(--md-sys-color-on-background);
      overflow: hidden;
    }`
    document.head.appendChild(style)
    const loadSymbols = this.hasAttribute('load-symbols') ? this.getAttribute('load-symbols') !== 'false' : true

    if (this.loadFont || loadSymbols) this.#loadLink('https://fonts.googleapis.com', 'preconnect')
    this.#loadLink('https://fonts.gstatic.com', 'preconnect', ['crossorigin'])

    if (this.loadFont) this.#loadLink('https://fonts.googleapis.com/css2?family=Roboto&display=swap', 'stylesheet')

    if (loadSymbols) this.#loadLink(this.#generateSymbolsLink(), 'stylesheet')
  }

  #mediaQueryChange = ({ matches }) => {
    this.narrow = matches

    document.dispatchEvent(new CustomEvent('custom-theme-narrow', { detail: this.narrow }))
  }

  set language(value) {
    this.setAttribute('language', value)
  }

  // todo: support css & json
  get language() {
    return this.getAttribute('language') || 'css'
  }
  /**
   * loads given path and converst (when needed) to css variables
   * @param {string} path
   */
  async load(path: string) {
    if (this.language === 'js') {
      const importee = await import(path)
      for (const [property, value] of Object.entries(importee)) {
        const cssProperty = `--${property.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}`
        document.body.style.setProperty(cssProperty, value as string)
      }
    } else if (this.language === 'css') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = path
      document.head.appendChild(link)
    }
  }
}
