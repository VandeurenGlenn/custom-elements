import { customElement } from 'custom-element-decorator';
import { LiteElement, html, query, property } from '@vandeurenglenn/lite';

import './../pane/pane.js';

@customElement()
export class CustomSupportingPane extends LiteElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @property({ type: String, reflect: true })
  variant: 'compact' | 'medium' | 'expanded' = 'expanded';

  @property({ type: Boolean, reflect: true })
  left: boolean = false;

  @property({ type: String, reflect: true })
  id: string;

  @query('.support')
  supporting;

  onPaneClose({ detail }: CustomEvent) {
    console.log(detail, this.id);

    if (this.id === detail) {
      this.open = false;
    }
  }

  connectedCallback(): void {
    document.addEventListener('custom-pane-close', this.onPaneClose.bind(this));

    document.addEventListener('custom-pane-open', ({ detail }) => {
      if (this.id === detail) this.open = true;
    });
  }

  render() {
    return html`<style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--md-sys-color-surface);
          color: var(--md-sys-color-on-surface);
          width: 100%;
          position: relative;
          --supporting-pane-width: 360px;
        }
        .support {
          position: absolute;
          right: 0;
        }

        :host([left]) {
          left: 0;
          right: none;
        }
        :host([variant='expanded']) .support {
          --custom-pane-width: var(--supporting-pane-width);
        }
        :host([variant='expanded']) {
          flex-direction: row;
        }

        :host([variant='compact']) .support {
          position: absolute;
          flex-direction: row;
        }
        main {
          width: 100%;
        }
        :host([open]) main {
          width: calc(100% - var(--supporting-pane-width));
        }
      </style>
      <main>
        <slot></slot>
      </main>
      <custom-pane
        class="support"
        ?open=${this.open}
        ?right=${!this.left}
        id=${this.id}
      >
        <slot name="supporting">
          <slot name="supporting-header" slot="header"></slot>
          <slot name="supporting-content"></slot>
        </slot>
      </custom-pane>`;
  }
}
