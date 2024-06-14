import { customElement, LiteElement, html, css, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/it.js'
import '@vandeurenglenn/flex-elements/row.js'
import style from '@vandeurenglenn/custom-shared-styles/top-app-bar.css'
export declare type AppBarTypes = 'center-aligned' | 'small' | 'medium' | 'large'

@customElement('custom-top-app-bar')
export class CustomTopAppBar extends LiteElement {
  @property({ type: String, reflect: true })
  accessor type: AppBarTypes = 'center-aligned'

  @property({ type: Boolean, reflect: true })
  accessor scrolling: boolean

  static styles = [style]

  connectedCallback(): void {
    document.addEventListener('custom-scroll', ({ detail }: CustomEvent) => {
      this.scrolling = detail.scrolling
    })
  }

  render() {
    return html`
      <flex-column class="container">
        <custom-elevation></custom-elevation>
        <flex-row>
          <slot name="start"></slot>
          ${this.type === 'center-aligned' || this.type === 'small'
            ? html`
                <custom-typography>
                  <slot name="title"></slot>
                </custom-typography>
              `
            : ''}
          <flex-it></flex-it>
          <slot name="end"></slot>
        </flex-row>
        ${this.type === 'medium' || this.type === 'large'
          ? html`
              <flex-it></flex-it>
              <custom-typography type="headline" size="small">
                <slot name="title"></slot>
              </custom-typography>
            `
          : ''}
      </flex-column>
    `
  }
}
