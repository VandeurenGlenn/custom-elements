import { SelectBase } from './select-mixin.js'
import { listen } from '@vandeurenglenn/lite'

export class SelectorBase extends SelectBase {
  @listen('click')
  onClick(event: Event): void {
    const target = event.composedPath()[0] as HTMLElement

    if (target.localName === this.localName) return

    const selected = target.getAttribute(this.attrForSelected) || target

    if (this.multi) {
      const selectedArray = Array.isArray(this.selected) ? this.selected : []
      const index = selectedArray.indexOf(selected)
      if (index === -1) selectedArray.push(selected)
      else selectedArray.splice(index, 1)
      this.selected = selectedArray
    } else this.selected = selected

    this.dispatchEvent(new CustomEvent('selected', { detail: selected, bubbles: true, composed: true }))
  }
}

export function SelectorMixin<TBase extends CustomElementConstructor>(Base: TBase) {
  return SelectorBase
}
