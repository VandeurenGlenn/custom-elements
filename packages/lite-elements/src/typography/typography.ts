import { customElement, LiteElement, css, html, property } from '@vandeurenglenn/lite'

@customElement('custom-typography')
export class CustomTypography extends LiteElement {
  @property({ type: String, reflect: true })
  accessor type: 'label' | 'title' | 'headline' | 'display' | 'body' = 'title'

  @property({ type: String, reflect: true })
  accessor size: 'small' | 'medium' | 'large' = 'large'

  static styles = [
    css`
      :host {
        display: contents;
      }

      :host([type='display'][size='large']) slot {
        font-family: var(--md-sys-typescale-display-large-font-family-name);
        font-style: var(--md-sys-typescale-display-large-font-family-style);
        font-weight: var(--md-sys-typescale-display-large-font-weight);
        font-size: var(--md-sys-typescale-display-large-font-size);
        letter-spacing: var(--md-sys-typescale-display-large-tracking);
        line-height: var(--md-sys-typescale-display-large-height);
        text-transform: var(--md-sys-typescale-display-large-text-transform);
        text-decoration: var(--md-sys-typescale-display-large-text-decoration);
      }
      :host([type='display'][size='medium']) slot {
        font-family: var(--md-sys-typescale-display-medium-font-family-name);
        font-style: var(--md-sys-typescale-display-medium-font-family-style);
        font-weight: var(--md-sys-typescale-display-medium-font-weight);
        font-size: var(--md-sys-typescale-display-medium-font-size);
        letter-spacing: var(--md-sys-typescale-display-medium-tracking);
        line-height: var(--md-sys-typescale-display-medium-height);
        text-transform: var(--md-sys-typescale-display-medium-text-transform);
        text-decoration: var(--md-sys-typescale-display-medium-text-decoration);
      }
      :host([type='display'][size='small']) slot {
        font-family: var(--md-sys-typescale-display-small-font-family-name);
        font-style: var(--md-sys-typescale-display-small-font-family-style);
        font-weight: var(--md-sys-typescale-display-small-font-weight);
        font-size: var(--md-sys-typescale-display-small-font-size);
        letter-spacing: var(--md-sys-typescale-display-small-tracking);
        line-height: var(--md-sys-typescale-display-small-height);
        text-transform: var(--md-sys-typescale-display-small-text-transform);
        text-decoration: var(--md-sys-typescale-display-small-text-decoration);
      }
      :host([type='headline'][size='large']) slot {
        font-family: var(--md-sys-typescale-headline-large-font-family-name);
        font-style: var(--md-sys-typescale-headline-large-font-family-style);
        font-weight: var(--md-sys-typescale-headline-large-font-weight);
        font-size: var(--md-sys-typescale-headline-large-font-size);
        letter-spacing: var(--md-sys-typescale-headline-large-tracking);
        line-height: var(--md-sys-typescale-headline-large-height);
        text-transform: var(--md-sys-typescale-headline-large-text-transform);
        text-decoration: var(--md-sys-typescale-headline-large-text-decoration);
      }
      :host([type='headline'][size='medium']) slot {
        font-family: var(--md-sys-typescale-headline-medium-font-family-name);
        font-style: var(--md-sys-typescale-headline-medium-font-family-style);
        font-weight: var(--md-sys-typescale-headline-medium-font-weight);
        font-size: var(--md-sys-typescale-headline-medium-font-size);
        letter-spacing: var(--md-sys-typescale-headline-medium-tracking);
        line-height: var(--md-sys-typescale-headline-medium-height);
        text-transform: var(--md-sys-typescale-headline-medium-text-transform);
        text-decoration: var(--md-sys-typescale-headline-medium-text-decoration);
      }
      :host([type='headline'][size='small']) slot {
        font-family: var(--md-sys-typescale-headline-small-font-family-name);
        font-style: var(--md-sys-typescale-headline-small-font-family-style);
        font-weight: var(--md-sys-typescale-headline-small-font-weight);
        font-size: var(--md-sys-typescale-headline-small-font-size);
        letter-spacing: var(--md-sys-typescale-headline-small-tracking);
        line-height: var(--md-sys-typescale-headline-small-height);
        text-transform: var(--md-sys-typescale-headline-small-text-transform);
        text-decoration: var(--md-sys-typescale-headline-small-text-decoration);
      }
      :host([type='body'][size='large']) slot {
        font-family: var(--md-sys-typescale-body-large-font-family-name);
        font-style: var(--md-sys-typescale-body-large-font-family-style);
        font-weight: var(--md-sys-typescale-body-large-font-weight);
        font-size: var(--md-sys-typescale-body-large-font-size);
        letter-spacing: var(--md-sys-typescale-body-large-tracking);
        line-height: var(--md-sys-typescale-body-large-height);
        text-transform: var(--md-sys-typescale-body-large-text-transform);
        text-decoration: var(--md-sys-typescale-body-large-text-decoration);
      }
      :host([type='body'][size='medium']) slot {
        font-family: var(--md-sys-typescale-body-medium-font-family-name);
        font-style: var(--md-sys-typescale-body-medium-font-family-style);
        font-weight: var(--md-sys-typescale-body-medium-font-weight);
        font-size: var(--md-sys-typescale-body-medium-font-size);
        letter-spacing: var(--md-sys-typescale-body-medium-tracking);
        line-height: var(--md-sys-typescale-body-medium-height);
        text-transform: var(--md-sys-typescale-body-medium-text-transform);
        text-decoration: var(--md-sys-typescale-body-medium-text-decoration);
      }
      :host([type='body'][size='small']) slot {
        font-family: var(--md-sys-typescale-body-small-font-family-name);
        font-style: var(--md-sys-typescale-body-small-font-family-style);
        font-weight: var(--md-sys-typescale-body-small-font-weight);
        font-size: var(--md-sys-typescale-body-small-font-size);
        letter-spacing: var(--md-sys-typescale-body-small-tracking);
        line-height: var(--md-sys-typescale-body-small-height);
        text-transform: var(--md-sys-typescale-body-small-text-transform);
        text-decoration: var(--md-sys-typescale-body-small-text-decoration);
      }
      :host([type='label'][size='large']) slot {
        font-family: var(--md-sys-typescale-label-large-font-family-name);
        font-style: var(--md-sys-typescale-label-large-font-family-style);
        font-weight: var(--md-sys-typescale-label-large-font-weight);
        font-size: var(--md-sys-typescale-label-large-font-size);
        letter-spacing: var(--md-sys-typescale-label-large-tracking);
        line-height: var(--md-sys-typescale-label-large-height);
        text-transform: var(--md-sys-typescale-label-large-text-transform);
        text-decoration: var(--md-sys-typescale-label-large-text-decoration);
      }
      :host([type='label'][size='medium']) slot {
        font-family: var(--md-sys-typescale-label-medium-font-family-name);
        font-style: var(--md-sys-typescale-label-medium-font-family-style);
        font-weight: var(--md-sys-typescale-label-medium-font-weight);
        font-size: var(--md-sys-typescale-label-medium-font-size);
        letter-spacing: var(--md-sys-typescale-label-medium-tracking);
        line-height: var(--md-sys-typescale-label-medium-height);
        text-transform: var(--md-sys-typescale-label-medium-text-transform);
        text-decoration: var(--md-sys-typescale-label-medium-text-decoration);
      }
      :host([type='label'][size='small']) slot {
        font-family: var(--md-sys-typescale-label-small-font-family-name);
        font-style: var(--md-sys-typescale-label-small-font-family-style);
        font-weight: var(--md-sys-typescale-label-small-font-weight);
        font-size: var(--md-sys-typescale-label-small-font-size);
        letter-spacing: var(--md-sys-typescale-label-small-tracking);
        line-height: var(--md-sys-typescale-label-small-height);
        text-transform: var(--md-sys-typescale-label-small-text-transform);
        text-decoration: var(--md-sys-typescale-label-small-text-decoration);
      }
      :host([type='title'][size='large']) slot {
        font-family: var(--md-sys-typescale-title-large-font-family-name);
        font-style: var(--md-sys-typescale-title-large-font-family-style);
        font-weight: var(--md-sys-typescale-title-large-font-weight);
        font-size: var(--md-sys-typescale-title-large-font-size);
        letter-spacing: var(--md-sys-typescale-title-large-tracking);
        line-height: var(--md-sys-typescale-title-large-height);
        text-transform: var(--md-sys-typescale-title-large-text-transform);
        text-decoration: var(--md-sys-typescale-title-large-text-decoration);
      }
      :host([type='title'][size='medium']) slot {
        font-family: var(--md-sys-typescale-title-medium-font-family-name);
        font-style: var(--md-sys-typescale-title-medium-font-family-style);
        font-weight: var(--md-sys-typescale-title-medium-font-weight);
        font-size: var(--md-sys-typescale-title-medium-font-size);
        letter-spacing: var(--md-sys-typescale-title-medium-tracking);
        line-height: var(--md-sys-typescale-title-medium-height);
        text-transform: var(--md-sys-typescale-title-medium-text-transform);
        text-decoration: var(--md-sys-typescale-title-medium-text-decoration);
      }
      :host([type='title'][size='small']) slot {
        font-family: var(--md-sys-typescale-title-small-font-family-name);
        font-style: var(--md-sys-typescale-title-small-font-family-style);
        font-weight: var(--md-sys-typescale-title-small-font-weight);
        font-size: var(--md-sys-typescale-title-small-font-size);
        letter-spacing: var(--md-sys-typescale-title-small-tracking);
        line-height: var(--md-sys-typescale-title-small-height);
        text-transform: var(--md-sys-typescale-title-small-text-transform);
        text-decoration: var(--md-sys-typescale-title-small-text-decoration);
      }
    `
  ]

  render() {
    return html` <slot></slot> `
  }
}
