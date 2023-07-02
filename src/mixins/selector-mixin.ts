import SelectMixin from './select-mixin.js'

export default base =>
  class SelectorMixin extends SelectMixin(base) {
    constructor() {
      super();
      this.multi = this.hasAttribute('multi');
    }

    connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      this.slotted.addEventListener('click', this.#onClick.bind(this));
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
      this.slotted.removeEventListener('click', this.#onClick.bind(this));
    }

    #onClick(event) {
      const target = event.composedPath()[0];

      if (target.localName === this.localName) {
        // was just a click in the host element so we don't need todo anything  
        return
      }
      
      const attr = target.getAttribute(this.attrForSelected);
      
      let selected = attr ? attr : target
      
      if (this.multi) {
        if (!Array.isArray(this.selected)) this.selected = [];
        const index = this.selected.indexOf(selected);
        if (index === -1) this.selected.push(selected);
        else this.selected.splice(index, 1);
        // trigger observer
        this.select(this.selected);
      } else this.selected = selected;

        // if (this.selected) this.selected = selected;
        
      this.dispatchEvent(new CustomEvent('selected', { detail: selected }));
    }
    
  }