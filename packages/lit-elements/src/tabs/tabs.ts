import { customElement } from 'custom-element-decorator';
import { SelectorBase } from '../mixins/selector-mixin.js';
import { LitElement, PropertyValueMap, html } from 'lit';
import './tab.js'
import { property } from 'lit/decorators.js';

@customElement()
export class CustomTabs extends SelectorBase {
  // TODO: make scrollable

  render() {
    return html`
      <style>
        :host {
          --custom-tabs-background: var(---md-sys-color-surface);
          --selected-color: var(--md-sys-color-primary);
          --selected-tab-color: var(--md-sys-color-primary);
          --custom-tabs-shape: var(--md-sys-shape-corner-none);
          --inactive-color: var(--md-sys-color-on-surface-variant);
          display: flex;
          flex-direction: row;
          height: var(--custom-tabs-height, 40px);
          background: var(--custom-tabs-background);
          border-radius: var(--custom-tabs-shape);
        }
        ::slotted(*) {
          color: var(--inactive-color);
        }
        ::slotted(.custom-selected) {
          color: var(--selected-color);
          border-bottom: 2px solid var(--selected-tab-color);
        }

        :host([round]) ::slotted(*) {
          gap: 0;
        }

        :host([round]) ::slotted(.custom-selected) {
          --md-sys-color-on-surface: var(--md-sys-color-on-tertiary);
          color: var(--md-sys-color-on-tertiary);
          background: var(--md-sys-color-tertiary);
          border: none;
          border-radius: var(--md-sys-shape-corner-extra-large);
        }
      </style>
      <slot></slot>
      
    `;
  }
}
