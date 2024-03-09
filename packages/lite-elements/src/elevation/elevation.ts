/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { customElement, LiteElement, html, property } from '@vandeurenglenn/lite'

@customElement('custom-elevation')
export class CustomElevation extends LiteElement {
  @property({ type: Number, renders: false })
  accessor level: number

  onChange(propertyKey, value): void {
    if (propertyKey === 'level') this.style.setProperty('--md-elevation-level', String(value))
  }

  render() {
    return html`
      <style>
        :host {
          --_level: var(--md-elevation-level, 0);
          --_shadow-color: var(--md-sys-color-shadow);
          display: flex;
          pointer-events: none;
        }

        :host,
        .shadow,
        .shadow::before,
        .shadow::after {
          border-radius: inherit;
          inset: 0;
          position: absolute;
          transition-duration: inherit;
          transition-timing-function: inherit;
        }

        .shadow::before,
        .shadow::after {
          content: '';
          transition-property: box-shadow, opacity;
        }

        .shadow::before {
          box-shadow: 0px
            calc(
              1px * (clamp(0, var(--_level), 1) + clamp(0, var(--_level) - 3, 1) + 2 * clamp(0, var(--_level) - 4, 1))
            )
            calc(
              1px * (2 * clamp(0, var(--_level), 1) + clamp(0, var(--_level) - 2, 1) + clamp(0, var(--_level) - 4, 1))
            )
            0px var(--_shadow-color);
          opacity: 0.3;
        }

        .shadow::after {
          box-shadow: 0px
            calc(
              1px * (clamp(0, var(--_level), 1) + clamp(0, var(--_level) - 1, 1) + 2 * clamp(0, var(--_level) - 2, 3))
            )
            calc(1px * (3 * clamp(0, var(--_level), 2) + 2 * clamp(0, var(--_level) - 2, 3)))
            calc(1px * (clamp(0, var(--_level), 4) + 2 * clamp(0, var(--_level) - 4, 1))) var(--_shadow-color);
          opacity: 0.15;
        }
      </style>

      <span class="shadow"></span>
    `
  }
}
