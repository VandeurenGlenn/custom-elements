import { DemoSection } from './demo/section.js'

export {
  DemoSection
}

declare global {
  interface HTMLElementTagNameMap {
    'demo-section': DemoSection
  }
}