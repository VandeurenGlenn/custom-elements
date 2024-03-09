import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'
import './../icon/icon-set.js'

@customElement('demo-icons')
export class DemoIcons extends LiteElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ]

  render() {
    return html` <custom-icon-set>
      <template>
        <span name="home">@symbol-home</span>
        <span name="menu">@symbol-menu</span>
        <span name="info">@symbol-info</span>
        <span name="check_box">@symbol-check_box</span>
        <span name="menu_open">@symbol-menu_open</span>
        <span name="more_vert">@symbol-more_vert</span>
        <span name="close">@symbol-close</span>
        <span name="check_box_outline_blank">@symbol-check_box_outline_blank</span>
      </template>
    </custom-icon-set>`
  }
}
