import { LitElement, PropertyValueMap } from 'lit'
import { property } from 'lit/decorators.js'

export class SelectBase extends LitElement {
  #selected: string | number | HTMLElement
  currentSelected: string | number | HTMLElement
  #slot?: HTMLSlotElement
  #slotchange = () => this.#requestSelectedUpdate()

  constructor() {
    super()
    this.selected = this.defaultSelected
  }

  get multi() {
    return this.hasAttribute('multi')
  }

  set multi(value: boolean) {
    value ? this.setAttribute('multi', '') : this.removeAttribute('multi')
  }

  get defaultSelected() {
    return this.getAttribute('default-selected') || 0
  }

  set selected(value: string | number | HTMLElement) {
    this.#selected = value
    this.#requestSelectedUpdate()
  }

  get selected(): string | number | HTMLElement {
    return this.#selected
  }

  get slotted() {
    return this.renderRoot?.querySelector('slot') || this.shadowRoot?.querySelector('slot') || this
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback()
    this.#attachSlotChangeListener()
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback()
    if (this.#slot) {
      this.#slot.removeEventListener('slotchange', this.#slotchange)
      this.#slot = undefined
    }
  }

  #attachSlotChangeListener() {
    const slot =
      (this.renderRoot?.querySelector('slot') as HTMLSlotElement | null) ||
      (this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null)
    if (!slot || slot === this.#slot) return
    this.#slot?.removeEventListener('slotchange', this.#slotchange)
    this.#slot = slot
    this.#slot.addEventListener('slotchange', this.#slotchange)
  }

  get #assignedNodes() {
    const nodes = 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children
    const arr = []
    for (var i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (node.nodeType === 1) arr.push(node)
    }
    return arr
  }

  get attrForSelected() {
    return this.getAttribute('attr-for-selected') || 'name'
  }

  /**
   * get the attribute used to set selected
   *
   * @example
   * <custom-selector attr-for-selected="select">
   *  <li select="1"></li>
   *  <li select="2"></li>
   * </custom-selector>
   */
  set attrForSelected(value) {
    this.setAttribute('attr-for-selected', value)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // check if value is number
      if (!isNaN(newValue)) {
        newValue = Number(newValue)
      }
      this[name] = newValue
    }
  }

  /**
   * @param {string|number|HTMLElement} selected
   */
  select(selected) {
    if (selected) this.selected = selected
    // TODO: fix selectedobservers
    if (this.multi) this.#requestSelectedUpdate()
  }

  next() {
    const index = this.getIndexFor(this.currentSelected)
    if (
      index !== -1 &&
      index >= 0 &&
      this.#assignedNodes.length > index &&
      index + 1 <= this.#assignedNodes.length - 1
    ) {
      this.selected = this.#assignedNodes[index + 1]
    }
  }

  previous() {
    const index = this.getIndexFor(this.currentSelected)
    if (index !== -1 && index >= 0 && this.#assignedNodes.length > index && index - 1 >= 0) {
      this.selected = this.#assignedNodes[index - 1]
    }
  }

  getIndexFor(element) {
    return this.#assignedNodes.indexOf(element || this.selected)
  }

  #updateSelected(selected: HTMLElement, currentSelected: HTMLElement) {
    selected.classList.add('custom-selected')
    if (currentSelected && currentSelected !== selected) {
      currentSelected.classList.remove('custom-selected')
    }
    this.currentSelected = selected
  }

  #updateMultiSelected(selected: string[]) {
    for (const child of this.#assignedNodes) {
      if (selected.includes(child.getAttribute(this.attrForSelected))) {
        child.classList.add('custom-selected')
      } else {
        child.classList.remove('custom-selected')
      }
    }
  }

  #updateStringSelected(selected: string) {
    for (const child of this.#assignedNodes) {
      if (child.getAttribute(this.attrForSelected) === selected) {
        return this.#updateSelected(child, this.currentSelected as HTMLElement)
      }
    }
  }

  #requestSelectedUpdate() {
    const selected = this.selected
    if (selected === undefined || selected === null) {
      if (this.currentSelected instanceof HTMLElement) {
        this.currentSelected.classList.remove('custom-selected')
      }
      return
    }

    if (Array.isArray(selected)) return this.#updateMultiSelected(selected as string[])
    const type = typeof selected
    if (type === 'object') return this.#updateSelected(selected as HTMLElement, this.currentSelected as HTMLElement)
    if (type === 'string') return this.#updateStringSelected(selected as string)

    // set selected by index
    const child = this.#assignedNodes[selected as number]
    if (child) this.#updateSelected(child, this.currentSelected as HTMLElement)
    // remove selected even when nothing found, better to return nothing
  }
}

export function SelectMixin<TBase extends CustomElementConstructor>(Base: TBase) {
  return SelectBase
}
