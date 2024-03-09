import { SelectBase } from './select-mixin.js'

export class SelectorBase extends SelectBase {
  constructor() {
    super()
  }

  async connectedCallback() {
    super.connectedCallback && (await super.connectedCallback())
    // this.updateComplete && await this.updateComplete
    this.slotted.addEventListener('click', this.#onClick.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback()
    this.slotted.removeEventListener('click', this.#onClick.bind(this))
  }

  #onClick(event: Event) {
    const target = event.composedPath()[0] as HTMLElement

    if (target.localName === this.localName) {
      // was just a click in the host element so we don't need todo anything
      return
    }

    const selected = target.getAttribute(this.attrForSelected) || target

    if (this.multi) {
      const selectedArray = Array.isArray(this.selected) ? this.selected : []
      const index = selectedArray.indexOf(selected)
      if (index === -1) selectedArray.push(selected)
      else selectedArray.splice(index, 1)
      // trigger observer
      this.selected = selectedArray
    } else this.selected = selected

    this.dispatchEvent(new CustomEvent('selected', { detail: selected }))
  }
}

export function SelectorMixin<TBase extends CustomElementConstructor>(Base: TBase) {
  return SelectorBase
}
