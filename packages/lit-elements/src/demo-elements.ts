import { DemoIcons } from './demo/demo-icons.js'
import { DemoShell } from './demo/demo.js'
import { DemoSection } from './demo/section.js'

export {
  DemoSection,
  // DemoShell,
  DemoIcons
}

declare global {
  interface HTMLElementTagNameMap {
    'demo-icons': DemoIcons
    'demo-section': DemoSection
    // 'demo-shell': DemoShell
  }
}