import { listen } from '@vandeurenglenn/lite'

export const ScrollMixin = (Base) =>
  class ScrollMixin extends Base {
    scrollTimeout = 100

    constructor(...args) {
      super(...args)
      this.addConnectionEffect(() => () => {
        if (this.isScrolling) clearTimeout(this.isScrolling)
      })
    }

    set scrolling(value) {
      if (value) this.setAttribute('scrolling', '')
      else this.removeAttribute('scrolling')
    }

    get scrolling() {
      return this.hasAttribute('scrolling')
    }

    @listen('scroll')
    onScroll() {
      if (this.isScrolling) clearTimeout(this.isScrolling)
      else document.dispatchEvent(new CustomEvent('custom-scroll', { detail: { scrolling: this.scrollTop !== 0 } }))
      this.isScrolling = setTimeout(() => {
        this.scrolling = this.scrollTop !== 0
        document.dispatchEvent(new CustomEvent('custom-scroll', { detail: { scrolling: this.scrolling } }))
        this.isScrolling = undefined
      }, this.scrollTimeout)
    }

  }
