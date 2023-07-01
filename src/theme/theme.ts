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
      background: var(--md-sys-color-background)
    }`
    document.body.appendChild(style)
    
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