export const ScrollMixin = (Base) =>
  class ScrollMixin extends Base {
    set scrolling(value) {
      if (value) this.setAttribute('scrolling', '')
      else this.removeAttribute('scrolling')
    }

    get scrolling() {
      return this.hasAttribute('scrolling')
    }

    scrollElement

    #onscroll = () => {
      if (this.isScrolling) clearTimeout(this.isScrolling)
      else document.dispatchEvent(new CustomEvent('custom-scroll', { detail: { scrolling: this.scrollTop !== 0 } }))
      this.isScrolling = setTimeout(() => {
        this.scrolling = this.scrollTop !== 0
        document.dispatchEvent(new CustomEvent('custom-scroll', { detail: { scrolling: this.scrolling } }))
        this.isScrolling = undefined
      }, this.scrollTimeout)
    }

    firstRender() {
      super.firstRender?.()
      this.scrollElement = this.scrollElement ? this.shadowRoot.querySelector(this.scrollElement) : this
      this.scrollTimeout = 100
      this.scrollElement.addEventListener('scroll', this.#onscroll)
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback()
      this.scrollElement.removeEventListener('scroll', this.#onscroll)
    }
  }
