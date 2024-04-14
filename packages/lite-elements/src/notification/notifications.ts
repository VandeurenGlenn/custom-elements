import { css, html, LiteElement, customElement, property } from '@vandeurenglenn/lite'
import './notification.js'
import { CustomNotification } from './notification.js'
import './../icon/icon.js'
import './../pane/pane.js'
import '@vandeurenglenn/flex-elements/row.js'

@customElement('custom-notifications')
export class CustomNotifications extends LiteElement {
  @property({ type: Boolean, reflect: true })
  accessor open: boolean

  get _list() {
    return this.shadowRoot.querySelector('.list')
  }

  createNotification(
    { title, message, image }: { title: string; message: string; image?: string },
    timeout: EpochTimeStamp = 3000
  ) {
    const notification = document.createElement('custom-notification') as CustomNotification
    notification.title = title
    notification.message = message
    notification.image = image
    if (timeout) {
      setTimeout(() => {
        this.removeChild(notification)
        const _notification = document.createElement('custom-notification') as CustomNotification
        _notification.image = image
        _notification.title = title
        _notification.message = message
        this._list.appendChild(_notification)
      }, timeout)
    }
    this.appendChild(notification)
  }

  _onclick() {
    const children = Array.from(this._list.querySelectorAll('custom-notification'))
    for (const child of children) {
      this._list.removeChild(child)
    }
    this.open = false
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        pointer-events: auto;
        z-index: 10001;
        position: absolute;
        right: 0;
        top: 0;
        overflow: hidden;
        width: 100%;
        max-width: 320px;
        height: auto;
        box-sizing: border-box;
        color: #eee;
        pointer-events: none;
        height: 100%;
      }

      :host([open]) {
        background: var(--md-sys-color-surface-container-high);
      }

      .recents {
        display: block;
        position: relative;
        top: 12px;
        right: 12px;
        width: 100%;
        pointer-events: none;

        box-sizing: border-box;
        padding: 12px;
      }

      .list {
        padding: 24px;
        height: 100%;
      }

      custom-icon {
        pointer-events: auto;
      }
    `
  ]

  render() {
    return html`
      <flex-row style="margin-top: 12px;margin-right: 12px;">
        <flex-it></flex-it>
        <custom-icon
          icon="notifications"
          @click=${() => {
            if (this._list.childElementCount === 0) return
            this.open = !this.open
          }}
        ></custom-icon>
      </flex-row>

      <span class="recents">
        <slot></slot>
      </span>

      <custom-pane ?open=${this.open} right top>
        <span slot="header"></span>
        <flex-column class="list" slot="content"> </flex-column>

        <flex-row slot="footer" width="100%">
          <flex-it></flex-it>
          <custom-icon style="margin-right: 24px;" icon="clear-all" @click="${this._onclick}"></custom-icon>
        </flex-row>
      </custom-pane>
    `
  }
}
