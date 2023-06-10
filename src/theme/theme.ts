import { customElement } from 'custom-element-decorator'
import { CustomElement } from '../element.js'
import { propertiesConfig } from '../types.js'

@customElement()
export class CustomTheme extends CustomElement {
  fontSize: string
  styleAppended: Boolean = false

  static properties: propertiesConfig = {
    styleAppended: { type: Boolean },
    fontSize: {
      type: String,
      renders: false,
      attribute: true,
      // @ts-ignore
      observer: function (oldValue, value) {
        // console.log('observes');
        
        // // @ts-ignore
        // if (!this.styleAppended) {
        //   this.styleAppended = true
        //   const style = document.createElement('style')
        //   style.innerHTML = `
        //   :root {
        //     font-family: system-ui, sans-serif;
        //     font-size: var(--custom-theme-font-size, 1.2px);
        //   }`
        //   document.body.appendChild(style)
        // }
        // document.body.style.setProperty('--custom-theme-font-size', value)
        
    }
    }
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