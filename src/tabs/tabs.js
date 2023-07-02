import { customElement } from 'custom-element-decorator';
import SelectorMixin from './../mixins/selector-mixin';
import { LitElement, html } from 'lit';

@customElement()
export class CustomTabs extends SelectorMixin(LitElement) {
  // TODO: make scrollable
  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          height: var(--custom-tabs-height, 48px);
          --tab-underline-color:  #00B8D4;
        }
        ::slotted(.custom-selected) {
          border-bottom: 2px solid var(--tab-underline-color);
        }
      </style>
      <slot></slot>
    `;
  }
}
