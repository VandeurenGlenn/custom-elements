export default base => {
  return class SelectMixin extends base {
    #selected

    constructor() {
      super();
    }

    async connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      this.updateComplete && await this.updateComplete
      this.selected = this.getAttribute('default-selected') || 0
    }

    set selected(value) {
      this.#selected = value
      this.#requestSelectedUpdate()
    }

    get selected() {
      return this.#selected
    }

    get slotted() {
      return this.renderRoot ? this.renderRoot.querySelector('slot') : this;
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

    #updateSelected(selected) {
      selected.classList.add('custom-selected');
      if (this.currentSelected && this.currentSelected !== selected) {
        this.currentSelected.classList.remove('custom-selected');
      }
      this.currentSelected = selected;
    }

    #requestSelectedUpdate() {
      const type = typeof this.selected;
      if (Array.isArray(this.selected)) {
        for (const child of this.#assignedNodes) {
          if (this.selected.indexOf(child.getAttribute(this.attrForSelected)) !== -1) {
            child.classList.add('custom-selected');
          } else {
            child.classList.remove('custom-selected');
          }
        }
        return
      }
      
      if (type === 'object') return this.#updateSelected(this.selected);
      if (type === 'string') {
        for (const child of this.#assignedNodes) {
            if (child.getAttribute(this.attrForSelected) === this.selected) {
              return this.#updateSelected(child);
            }
        }
      } else {
        // set selected by index
        const child = this.#assignedNodes[this.selected];
        if (child) this.#updateSelected(child);
        // remove selected even when nothing found, better to return nothing
      }
    }
  }
}
