import { customElement } from 'custom-element-decorator'
import { LitElement } from 'lit'


@customElement()
export class CustomTheme extends LitElement {

  #preconnect(href, attributes?: string[]) {
    let link = document.createElement('link')

    link.rel = 'preconnect'
    link.href = href
    if (attributes) {
      for (const attribute of attributes) {
        link.setAttribute(attribute, '')
      }
    }
    document.head.appendChild(link)
  }

  #stylesheet(href, attributes?: string[]) {
    let link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = href
    if (attributes) {
      for (const attribute of attributes) {
        link.setAttribute(attribute, '')
      }
    }
    document.head.appendChild(link)

  }
   
  constructor() {
    super()

    // this.load('./themes/default/tokens.js')
    this.load('./themes/default/theme.css')
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

    this.#preconnect('https://fonts.googleapis.com'),
    this.#preconnect('https://fonts.gstatic.com', ['crossorigin']),
    this.#stylesheet('https://fonts.googleapis.com/css2?family=Roboto&display=swap'),
    this.#stylesheet('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap')
     
  }

  set language(value) {
    this.setAttribute('language',value)
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