import PubSub from '@vandeurenglenn/little-pubsub';
import { LitElement, html, css, PropertyValueMap, nothing, svg } from 'lit';
import { property, state } from 'lit/decorators.js';

globalThis.pubsub = globalThis.pubsub || new PubSub(true);
class Icon extends LitElement {
  @property({ attribute: false })
  host;

  @property({ type: String })
  icon = this.innerHTML;

  @property()
  set setName(value) {
    this.host =
      globalThis.pubsub.subscribers[
        `custom-icon-set-${value}-connected`
      ]?.value;
    if (!this.host) {
      globalThis.pubsub.subscribe(
        `custom-icon-set-${value}-connected`,
        (host) => {
          if (host) {
            this.host = host;
          }
        }
      );
    }
  }

  @state()
  _icon;

  static styles = [
    css`
      :host {
        --__custom-icon-size: var(--custom-icon-size, 24px);
        --custom-icon-color: var(--md-sys-color-on-surface);
        display: flex;
        height: var(--custom-icon-size, 24px);
        width: var(--custom-icon-size, 24px);
      }

      svg {
        fill: var(--custom-icon-color);
        height: inherit;
        width: inherit;
        pointer-events: none;
      }
    `,
  ];

  constructor() {
    super();
    this.setName = this.getAttribute('set-name') || 'icons';
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('icon') || _changedProperties.has('host')) {
      if (this.host && this.icon) this._icon = this.host.getIcon(this.icon);
    }
  }

  render() {
    return html` ${this._icon} `;
  }
}

customElements.define('custom-icon', Icon);

export { Icon, Icon as CustomIcon };
