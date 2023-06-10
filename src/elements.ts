import { CustomElement } from './element.js'
import { CustomCard } from './card/card.js'
import { CustomTheme } from './theme/theme.js'
import { CustomDivider } from './divider/divider.js'


export {
  CustomElement, // not really needed
  CustomTheme,
  CustomDivider,
  CustomCard
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-theme': CustomTheme,
    'custom-divider': CustomDivider,
    'custom-card': CustomCard
  }
}