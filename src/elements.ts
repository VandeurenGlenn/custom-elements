import { CustomCard } from './card/card.js'
import { CustomTheme } from './theme/theme.js'
import { CustomDivider } from './divider/divider.js'
import { CustomButton } from './button/button.js'
import { CustomBanner } from './banner/banner.js'
import { CustomSelector } from './selector/selector.js'
import { CustomPages } from './pages/pages.js'

export {
  CustomTheme,
  CustomDivider,
  CustomButton,
  CustomCard,
  CustomBanner,
  CustomSelector,
  CustomPages
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-theme': CustomTheme,
    'custom-divider': CustomDivider,
    'custom-card': CustomCard,
    'custom-button': CustomButton
    'custom-banner': CustomBanner
    'custom-selector': CustomSelector
    'custom-pages': CustomPages
  }
}