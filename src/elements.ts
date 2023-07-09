import { CustomCard } from './card/card.js'
import { CustomTheme } from './theme/theme.js'
import { CustomDivider } from './divider/divider.js'
import { CustomButton } from './button/button.js'
import { CustomBanner } from './banner/banner.js'
import { CustomSelector } from './selector/selector.js'
import { CustomPages } from './pages/pages.js'
import { CustomDrawer } from './drawer/drawer.js'
import { CustomDrawerButton } from './drawer/drawer-button.js'
import { CustomDrawerItem } from './drawer/drawer-item.js'
import { CustomSection } from './section/section.js'
import { CustomDrawerLayout } from './drawer/drawer-layout.js'
import { CustomTopAppBar } from './bar/top-app-bar.js'
import { CustomIcon } from './icon/icon.js'
import { CustomThemeMode } from './theme/mode.js'
import { CustomIconButton } from './button/icon-button.js'
import { CustomTypography } from './typography/typography.js'

export {
  CustomTheme,
  CustomDivider,
  CustomButton,
  CustomCard,
  CustomDrawer,
  CustomDrawerButton,
  CustomDrawerItem,
  CustomDrawerLayout,
  CustomBanner,
  CustomSection,
  CustomSelector,
  CustomPages,
  CustomTopAppBar,
  CustomIcon,
  CustomThemeMode,
  CustomIconButton,
  CustomTypography
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-theme': CustomTheme
    'custom-divider': CustomDivider
    'custom-card': CustomCard
    'custom-drawer': CustomDrawer
    'custom-drawer-button': CustomDrawerButton
    'custom-drawer-item': CustomDrawerItem
    'custom-drawer-layout': CustomDrawerLayout
    'custom-button': CustomButton
    'custom-banner': CustomBanner
    'custom-section': CustomSection
    'custom-selector': CustomSelector
    'custom-pages': CustomPages
    'custom-top-app-bar': CustomTopAppBar
    'custom-icon': CustomIcon
    'custom-theme-mode': CustomThemeMode
    'custom-icon-button': CustomIconButton,
    'custom-typography': CustomTypography
  }
}