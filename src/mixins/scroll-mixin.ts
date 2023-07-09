import { LitElement } from "lit"

export const ScrollMixin = (Base) => class ScrollMixin extends Base {
  connectedCallback(): void {
    super.connectedCallback()
    this.scrollTimeout = 100
    this.onscroll = () => {
      if (this.isScrolling) clearTimeout(this.isScrolling)
      else document.dispatchEvent(new CustomEvent('custom-scroll', { detail: {scrolling: this.scrollTop !== 0}}))
      this.isScrolling = setTimeout(() => {
        this.scrolling = this.scrollTop !== 0
        document.dispatchEvent(new CustomEvent('custom-scroll', { detail: {scrolling: this.scrolling}}))
        this.isScrolling = undefined
      }, this.scrollTimeout);
      
    }
  }
}