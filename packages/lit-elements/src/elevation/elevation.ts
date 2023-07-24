/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */

import { customElement } from 'custom-element-decorator'
import { LitElement, PropertyValueMap, html } from 'lit'
import { property } from 'lit/decorators.js'

@customElement()
export class CustomElevation extends LitElement {
  @property({ type: Number })
  level: number

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    _changedProperties.has('level') && this.style.setProperty('--md-elevation-level', String(this.level))
  }

  render() {
    return html`
      <style>
        :host{
          --_level: var(--md-elevation-level, 0);
          --_shadow-color: var(--md-sys-color-shadow);
          display: flex;
          pointer-events: none
        }
        
        :host, .shadow, .shadow::before, .shadow::after { 
          border-radius:inherit;
          inset:0;
          position:absolute;
          transition-duration:inherit;
          transition-timing-function:inherit
        }
        
        .shadow::before, .shadow::after {
          content:"";
          transition-property: box-shadow,opacity
        }
        
        .shadow::before{
          box-shadow: 0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);
          opacity:.3
        }
        
        .shadow::after{
          box-shadow: 0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);
          opacity:.15
        }
      </style>

      <span class="shadow"></span>
    `
  }
}