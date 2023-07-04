import { customElement } from 'custom-element-decorator'
import { LitElement } from 'lit'


@customElement()
export class CustomTheme extends LitElement {
  
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

    let link = document.createElement('link')

    link.rel = 'preconnect'
    link.href = 'https://fonts.googleapis.com'

    document.head.appendChild(link.cloneNode(true))

    link.href = 'https://fonts.gstatic.com'
    link.setAttribute('crossorigin', '')

    document.head.appendChild(link.cloneNode(true))
    
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
    link.removeAttribute('crossorigin')
    document.head.appendChild(link.cloneNode(true))

    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
    
    document.head.appendChild(link.cloneNode(true))
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