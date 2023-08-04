import { LitElement, PropertyValueMap } from "lit";
import { property } from "lit/decorators.js";

export class SelectBase extends LitElement {
  #selected: string | number | HTMLElement | string[] | HTMLElement[]
  currentSelected: HTMLElement

  constructor() {
    super();
    this.selected = this.defaultSelected
  }

  get multi() { return this.hasAttribute('multi') }

  set multi(value: boolean) { value ? this.setAttribute('multi', '') : this.removeAttribute('multi')}

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

  get slotted() {
    if (this.renderRoot) return this.renderRoot.querySelector('slot')
    if (this.shadowRoot) return this.shadowRoot.querySelector('slot')
    return this;
  }

  get #assignedNodes() {
    const nodes = 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children
    const arr = []
    for (var i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType === 1) arr.push(node);
    }
    return arr;
  }
  
  get attrForSelected() {
    return this.getAttribute('attr-for-selected') || 'name';
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
    this.setAttribute('attr-for-selected', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // check if value is number
      if (!isNaN(newValue)) {
        newValue = Number(newValue);
      }
      this[name] = newValue;
    }
  }

  /**
   * @param {string|number|HTMLElement} selected
   */
  select(selected) {
    if (selected) this.selected = selected;
    // TODO: fix selectedobservers
    if (this.multi) this.#requestSelectedUpdate()
  }

  next() {
    const index = this.getIndexFor(this.currentSelected);
    if (index !== -1 && index >= 0 && this.#assignedNodes.length > index &&
        (index + 1) <= this.#assignedNodes.length - 1) {
      this.selected = this.#assignedNodes[index + 1]
    }
  }

  previous() {
    const index = this.getIndexFor(this.currentSelected);
    if (index !== -1 && index >= 0 && this.#assignedNodes.length > index &&
        (index - 1) >= 0) {
      this.selected = this.#assignedNodes[index - 1]
    }
  }

  getIndexFor(element) {
    return this.#assignedNodes.indexOf(element || this.selected);
  }

  #updateSelected(selected: HTMLElement, currentSelected: HTMLElement) {
    selected.classList.add('custom-selected');
    if (currentSelected && currentSelected !== selected) {
      currentSelected.classList.remove('custom-selected');
    }
    this.currentSelected = selected;
  }

  #updateMultiSelected(selected: string[]) {
    for (const child of this.#assignedNodes) {
      if (selected.includes(child.getAttribute(this.attrForSelected))) {
        child.classList.add('custom-selected');
      } else {
        child.classList.remove('custom-selected');
      }
    }
  }

  #updateStringSelected(selected: string) {
    for (const child of this.#assignedNodes) {
      if (child.getAttribute(this.attrForSelected) === selected) {
        return this.#updateSelected(child, this.currentSelected as HTMLElement);
      }
    }
  }

  #requestSelectedUpdate() {
    if (!this.selected) {
      this.currentSelected && this.currentSelected.classList.remove('custom-selected');
      return 
    }

    const type = typeof this.selected;
    if (Array.isArray(this.selected)) return this.#updateMultiSelected(this.selected as string[])
    if (type === 'object') return this.#updateSelected(this.selected as HTMLElement, this.currentSelected as HTMLElement);
    if (type === 'string') return this.#updateStringSelected(this.selected as string)
    
    // set selected by index
    const child = this.#assignedNodes[this.selected as number];
    if (child) this.#updateSelected(child, this.currentSelected as HTMLElement);
    // remove selected even when nothing found, better to return nothing
    
  }
}

export function SelectMixin<TBase extends CustomElementConstructor>(Base: TBase) {
  return SelectBase
}
