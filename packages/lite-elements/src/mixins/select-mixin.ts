import { LiteElement, listen } from '@vandeurenglenn/lite'

export class SelectBase extends LiteElement {
  #selected!: string | number | HTMLElement | string[] | HTMLElement[]
  currentSelected?: HTMLElement
  @listen('slotchange', { target: 'slot' })
  onSlotChange(): void {
    this.#requestSelectedUpdate()
  }

  firstRender(): void {
    super.firstRender?.()
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

  set selected(value: string | number | HTMLElement | string[] | HTMLElement[]) {
    this.#selected = value
    this.#requestSelectedUpdate()
  }

  get selected(): string | number | HTMLElement | string[] | HTMLElement[] {
    return this.#selected
  }

  get slotted(): HTMLSlotElement | this {
    return this.shadowRoot?.querySelector('slot') || this
  }

  get #assignedNodes(): HTMLElement[] {
    const nodes = 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children
    const arr: HTMLElement[] = []
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as Node
      if (node.nodeType === 1) arr.push(node as HTMLElement)
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

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    super.attributeChangedCallback(name, oldValue, newValue)
    if (oldValue !== newValue) {
      // check if value is number
      if (newValue !== null && !isNaN(Number(newValue))) {
        newValue = Number(newValue) as unknown as string
      }
      ;(this as any)[name] = newValue
    }
  }

  /**
   * @param {string|number|HTMLElement} selected
   */
  select(selected: string | number | HTMLElement | string[] | HTMLElement[]) {
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

  getIndexFor(element: HTMLElement | string | number | undefined) {
    return this.#assignedNodes.indexOf((element as HTMLElement) || (this.selected as HTMLElement))
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
      if (selected.includes(child.getAttribute(this.attrForSelected) ?? '')) {
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
      this.currentSelected && this.currentSelected.classList.remove('custom-selected')
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
