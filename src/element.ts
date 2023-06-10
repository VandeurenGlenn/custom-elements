import { attributeConfig, propertyConfig } from './types.js';
import { render, html } from 'lit-html';

const defaultConfig: propertyConfig = {
  type: String,
  attribute: true,
  renders: true,
  reflect: false
}

export class CustomElement extends HTMLElement {
  #mutationObserver: MutationObserver;

  /**
   * array containing all observed attributes
   */
  #observedAttributes: string[] = []

  // TODO: do we wan't the propertyName in memory?
  // should just make on from the attributeName?
  /**
   * Array containing the property type and name
   */
  #observedAttributeConfig: attributeConfig[] = []

  firstRender: Boolean = true

  updateComplete: Promise<boolean>

  /**
   * 
   */
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    
    // binds arrtribute -> property by default
    // a type is needed to convert from attributes to properties
    // if no type is defined defaults to String
    // attribute: wether or not to treat as attribute (defaults to true)
    // @ts-ignore
    if (this.constructor.properties) {
      // @ts-ignore
      const propertyConfigs: [name: string, config: propertyConfig][] = Object.entries(this.constructor.properties)
      const properties: PropertyDescriptorMap = {}
  
      for (let [name, config] of propertyConfigs) {
  
        config = { ...defaultConfig, ...config}
  
        const attributeName = this.#toAttributeName(name)
        config.attributeName = attributeName

        if (config.attribute) {
          this.#observedAttributes.push(attributeName)
          this.#observedAttributeConfig.push({type: config.type, name})
        }
        let observer

        if (config.observer) observer = config.observer.bind(this)
        
        properties[name] = {
          set: (value) => {
            config.observer && observer(this[name], value)
            if (this[name] !== value)
              config.observer && observer(this[name], value)
              if (config.reflect) {
                if (config.type === Boolean) {
                  if (value) this.setAttribute(name, '')
                  else this.removeAttribute(name)
                } else this.setAttribute(name, this.#convert(value, config.type, 'string'))
              } else this[`_${name}`] = value;

              config.renders && this.requestUpdate();
          },
          get: () => {
            if (config.reflect) {
              if (config.type !== Boolean) return this.#convert(this.getAttribute(attributeName), config.type)
              else return this.hasAttribute(attributeName)
            } else return this[`_${name}`]
          }
        }
      }
      Object.defineProperties(this, properties)

      // set default/attribute values
      for (const [name, config] of propertyConfigs) {
        if (config.attribute) this[name] = this.getAttribute(config.attributeName) || config.value
      }
    }
  }

  #mutationObserverCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
      } else if (mutation.type === "attributes") {
        const value = mutation.target.getAttribute(mutation.attributeName)
        console.log(value);
        
        if (mutation.oldValue !== value) {
          const index = this.#observedAttributes.indexOf(mutation.attributeName)
          
          if (index !== -1) {
            const {name, type} = this.#observedAttributeConfig[index]
            // set property to same value as attribute
            this[name] = this.#convert(value, type)
          }
        }
      }
    }
  }

  #setupObserver() {
    this.#mutationObserver = new MutationObserver(this.#mutationObserverCallback)
    this.#mutationObserver.observe(this, {
      attributes: true,
      attributeOldValue: true
    });
  }

  requestUpdate() {
    this.updateComplete = new Promise((resolve, reject) => {
      queueMicrotask(() => {
        render(this.render(), this.shadowRoot);

        if (this.firstRender) this.firstRender = false
        resolve(true)
      })
      
    })
  }

  connectedCallback() {
    // only run the mutationObserver when we need to
    this.#observedAttributes.length !== 0 && this.#setupObserver()
  }

  disconnectedCallback() {
    this.#observedAttributes.length !== 0 && this.#mutationObserver.disconnect()
  }

  render() {
    return html`<slot></slot>`
  }

  /**
   * converts a string from/to the desired type
   */
  #convert(value, type, to: 'string' | 'type' = 'type') {
    if (to === 'string') {
      if (type === Array || type === Object) return JSON.stringify(value)
      else if (type === Uint8Array || type === Boolean || type === Number) return value.toString()
    } else {
      if(type === Array || type === Object) return JSON.parse(value)
      else if (type === Boolean) return Boolean(value === 'true')
      else if (type === Number) return Number(value)
      else if (type === Uint8Array) return new Uint8Array(value.split(','))
    }
    // returns default type (string)
    return value
  }
  
  #beforeRender() {
    if (!this.updateComplete) this.updateComplete
  }

  #toPropertyName = (string: string) =>
    string.replace(/\-([aA-zZ])(?!\-[aA-zZ])/g, (_, letter) => letter.toUpperCase())

  #toAttributeName = (string: string) =>
    string.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
} 