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
import { CustomTypography } from './typography/typography.js'
import { CustomPane } from './pane/pane.js'
import { CustomTabs } from './tabs/tabs.js'
import { CustomRoot } from './root/root.js'
import { CustomDialog } from './dialog/dialog.js'
import { CustomIconFont } from './icon/icon-font.js'
import { CustomIconSet } from './icon/icon-set.js'
import { CustomListItem } from './list/list-item.js'
import { CustomMenu } from './menu/menu.js'
import { CustomIconButton } from './button/icon-button.js'
import { CustomDropdownMenu } from './dropdown/dropdown-menu.js'
import { CustomDropdown } from './dropdown/dropdown.js'
import { CustomToggle } from './toggle/toggle.js'

export {
  CustomTheme,
  CustomDivider,
  CustomButton,
  CustomCard,
  CustomDialog,
  CustomDrawer,
  CustomDrawerButton,
  CustomDrawerItem,
  CustomDrawerLayout,
  CustomBanner,
  CustomPane,
  CustomSection,
  CustomSelector,
  CustomPages,
  CustomRoot,
  CustomTabs,
  CustomTopAppBar,
  CustomIcon,
  CustomIconFont,
  CustomIconSet,
  CustomTypography,
  CustomListItem,
  CustomMenu,
  CustomIconButton,
  CustomDropdownMenu,
  CustomDropdown,
  CustomToggle
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-theme': CustomTheme
    'custom-divider': CustomDivider
    'custom-card': CustomCard
    'custom-dialog': CustomDialog
    'custom-drawer': CustomDrawer
    'custom-drawer-button': CustomDrawerButton
    'custom-drawer-item': CustomDrawerItem
    'custom-drawer-layout': CustomDrawerLayout
    'custom-button': CustomButton
    'custom-banner': CustomBanner
    'custom-pane': CustomPane
    'custom-pages': CustomPages
    'custom-root': CustomRoot
    'custom-section': CustomSection
    'custom-selector': CustomSelector
    'custom-tabs': CustomTabs,
    'custom-top-app-bar': CustomTopAppBar
    'custom-icon': CustomIcon
    'custom-icon-font': CustomIconFont
    'custom-icon-set': CustomIconSet
    'custom-typography': CustomTypography
    'custom-list-item': CustomListItem
    'custom-menu': CustomMenu,
    'custom-icon-button': CustomIconButton
    'custom-dropdown': CustomDropdown
    'custom-dropdown-menu': CustomDropdownMenu,
    'custom-toggle': CustomToggle
  }
}