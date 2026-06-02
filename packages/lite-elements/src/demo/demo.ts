import { customElement, LiteElement, html, css, query } from '@vandeurenglenn/lite'

type SelectableElement = HTMLElement & { select: (value: string) => void }
type OpenableElement = HTMLElement & { open: boolean }
type LabelElement = HTMLElement & { label: string }
type TimeChangeDetail = { value: string; hour: number; minute: number; meridiem: string }

@customElement('demo-shell')
export class DemoShell extends LiteElement {
  @query('custom-selector')
  accessor selector!: SelectableElement

  @query('custom-pages')
  accessor pages!: SelectableElement

  @query('#demo-dialog')
  accessor dialog!: OpenableElement

  @query('#demo-dialog-fullscreen')
  accessor fullscreenDialog!: OpenableElement

  @query('#demo-time-picker')
  accessor timePicker!: HTMLElement

  @query('#time-picker-output')
  accessor timePickerOutput!: HTMLElement

  @query('#toggle-12-24')
  accessor toggleHourModeButton!: LabelElement

  #goToRoute = (route: string) => {
    if (!this.selector || !this.pages) return
    this.selector.select(route)
    this.pages.select(route)
    localStorage.setItem('last-selected', route)
  }

  #onSelectorSelected = ({ detail }: CustomEvent<string>) => {
    document.dispatchEvent(new CustomEvent('custom-scroll', { detail: { scrolling: false } }))
    this.pages.select(detail)
    localStorage.setItem('last-selected', detail)
  }

  firstRender() {
    this.selector?.addEventListener('selected', this.#onSelectorSelected as EventListener)

    const lastSelected = localStorage.getItem('last-selected')
    if (lastSelected) this.#goToRoute(lastSelected)

    this.shadowRoot?.querySelector('#jump-time-picker')?.addEventListener('click', () => this.#goToRoute('time-picker'))
    this.shadowRoot?.querySelector('#jump-buttons')?.addEventListener('click', () => this.#goToRoute('buttons'))
    this.shadowRoot?.querySelector('#jump-qa')?.addEventListener('click', () => this.#goToRoute('qa'))

    this.shadowRoot?.querySelector('#open-dialog')?.addEventListener('click', () => {
      this.dialog.open = true
    })

    this.shadowRoot?.querySelector('#open-fullscreen-dialog')?.addEventListener('click', () => {
      this.fullscreenDialog.open = true
    })

    this.timePicker?.addEventListener('time-change', (({ detail }: CustomEvent<TimeChangeDetail>) => {
      if (!this.timePickerOutput) return
      this.timePickerOutput.textContent = `Selected: ${detail.value} (${detail.hour}:${String(detail.minute).padStart(2, '0')} ${detail.meridiem})`
    }) as EventListener)

    this.toggleHourModeButton?.addEventListener('click', () => {
      if (!this.timePicker || !this.toggleHourModeButton) return
      const uses24Hour = this.timePicker.hasAttribute('use-24-hour')
      if (uses24Hour) {
        this.timePicker.removeAttribute('use-24-hour')
        this.toggleHourModeButton.label = 'Switch to 24h'
      } else {
        this.timePicker.setAttribute('use-24-hour', '')
        this.toggleHourModeButton.label = 'Switch to 12h'
      }
    })
  }

  static styles = [
    css`
      :host {
        position: absolute;
        inset: 0;
        display: block;
        overflow: hidden;
        font-family: 'DM Sans', sans-serif;
        color: var(--md-sys-color-on-background);
        background:
          radial-gradient(
            circle at 15% 10%,
            color-mix(in srgb, var(--md-sys-color-primary-container) 46%, transparent),
            transparent 36%
          ),
          radial-gradient(
            circle at 85% 86%,
            color-mix(in srgb, var(--md-sys-color-tertiary-container) 38%, transparent),
            transparent 42%
          ),
          var(--md-sys-color-background);
      }

      custom-drawer-layout {
        position: absolute;
        inset: 0;
      }

      .drawer-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
        height: 100%;
        padding: 8px 12px 16px;
      }

      .drawer-hero {
        margin: 8px 0 2px;
        padding: 14px;
        border-radius: var(--md-sys-shape-corner-large);
        background: color-mix(in srgb, var(--md-sys-color-surface-container-high) 86%, transparent);
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline-variant) 72%, transparent);
      }

      .drawer-kicker {
        margin: 0;
        color: var(--md-sys-color-on-surface-variant);
        text-transform: uppercase;
      }

      .drawer-title {
        margin: 6px 0 0;
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(1.05rem, 2.2vw, 1.35rem);
        font-weight: 600;
      }

      .drawer-foot {
        margin-top: auto;
        padding: 10px 12px;
        border-radius: var(--md-sys-shape-corner-medium);
        background: color-mix(in srgb, var(--md-sys-color-surface-container) 76%, transparent);
        color: var(--md-sys-color-on-surface-variant);
        font-size: 0.85rem;
      }

      custom-selector {
        display: flex;
        flex-direction: column;
        gap: 2px;
        overflow-y: auto;
        padding-right: 2px;
      }

      .top-end {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .pages {
        display: block;
        height: 100%;
      }

      .panel {
        display: flex;
        flex-direction: column;
        overflow: auto;
        box-sizing: border-box;
        gap: 16px;
        padding: clamp(14px, 2.2vw, 28px);
      }

      .hero {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 16px;
      }

      .hero-card,
      .surface {
        border-radius: var(--md-sys-shape-corner-extra-large);
        background: color-mix(in srgb, var(--md-sys-color-surface-container-high) 86%, transparent);
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline-variant) 72%, transparent);
        backdrop-filter: blur(8px);
      }

      .hero-card {
        padding: clamp(16px, 2.6vw, 28px);
      }

      .hero-card h1 {
        margin: 8px 0;
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(1.4rem, 3.8vw, 2.7rem);
        line-height: 1.08;
      }

      .hero-card p,
      .picker-state {
        margin: 0;
        color: var(--md-sys-color-on-surface-variant);
      }

      .hero-actions {
        margin-top: 18px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .metrics {
        padding: clamp(14px, 2vw, 20px);
        display: grid;
        gap: 10px;
        align-content: start;
      }

      .metric {
        background: color-mix(in srgb, var(--md-sys-color-surface-container-highest) 76%, transparent);
        border-radius: var(--md-sys-shape-corner-large);
        padding: 10px 12px;
      }

      .metric small {
        display: block;
        color: var(--md-sys-color-on-surface-variant);
      }

      .metric strong {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.25rem;
      }

      .surface {
        padding: clamp(14px, 2vw, 20px);
      }

      .surface h2 {
        margin: 0 0 12px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(1.1rem, 2.4vw, 1.45rem);
      }

      .cluster,
      .stack {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        align-items: center;
      }

      .stack {
        flex-direction: column;
        align-items: flex-start;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      custom-card img[slot='image'] {
        object-fit: cover;
        max-height: 180px;
      }

      .panel-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: var(--md-sys-shape-corner-full);
        padding: 8px 12px;
        background: color-mix(in srgb, var(--md-sys-color-secondary-container) 86%, transparent);
        color: var(--md-sys-color-on-secondary-container);
      }

      @media (max-width: 1100px) {
        .hero {
          grid-template-columns: 1fr;
        }

        .cards-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 760px) {
        .cards-grid {
          grid-template-columns: 1fr;
        }

        .panel {
          padding: 12px;
        }
      }
    `
  ]

  render() {
    return html`
      <custom-theme></custom-theme>
      <demo-icons></demo-icons>

      <custom-drawer-layout class="demo-container" drawer-open>
        <span slot="drawer-headline">Lite Elements</span>

        <div class="drawer-content" slot="drawer-content">
          <div class="drawer-hero">
            <p class="drawer-kicker">Material 3</p>
            <p class="drawer-title">Component Playground</p>
          </div>

          <custom-selector attr-for-selected="route" default-selected="overview">
            <custom-drawer-item route="overview">Overview</custom-drawer-item>
            <custom-drawer-item route="qa">All components</custom-drawer-item>
            <custom-drawer-item route="buttons">Buttons</custom-drawer-item>
            <custom-drawer-item route="cards">Cards</custom-drawer-item>
            <custom-drawer-item route="navigation">Navigation</custom-drawer-item>
            <custom-drawer-item route="dialogs">Dialogs</custom-drawer-item>
            <custom-drawer-item route="time-picker">Time picker</custom-drawer-item>
          </custom-selector>

          <div class="drawer-foot">
            Now showing: refreshed demo shell with responsive sections and stronger visual hierarchy.
          </div>
        </div>

        <span slot="top-app-bar-title">Lite Elements Demo</span>

        <div class="top-end" slot="top-app-bar-end">
          <custom-theme-mode></custom-theme-mode>
          <custom-icon-button icon="more_vert" type="tonal"></custom-icon-button>
        </div>

        <custom-pages class="pages" attr-for-selected="route" default-selected="overview">
          <section class="panel" route="overview">
            <div class="hero">
              <div class="hero-card">
                <small class="drawer-kicker">Refreshed Demo</small>
                <h1>Sharper surfaces, clearer structure, better scanability</h1>
                <p>
                  This page is reworked to feel like a real product UI, not only a component dump. Explore the routes
                  to see interactive controls, layout patterns, and the new Material time picker.
                </p>
                <div class="hero-actions">
                  <custom-button id="jump-time-picker" type="filled" label="Open time picker"></custom-button>
                  <custom-button id="jump-buttons" type="tonal" label="See button styles"></custom-button>
                  <custom-button id="jump-qa" type="outlined" label="QA route"></custom-button>
                </div>
              </div>
              <div class="metrics hero-card">
                <div class="metric">
                  <small>Design language</small>
                  <strong>Material 3</strong>
                </div>
                <div class="metric">
                  <small>Focus</small>
                  <strong>Visual consistency</strong>
                </div>
                <div class="metric">
                  <small>Interaction demo</small>
                  <strong>Live time change events</strong>
                </div>
              </div>
            </div>

            <div class="surface">
              <h2>Quick controls</h2>
              <div class="cluster">
                <custom-toggle-button togglers='["check_box","check_box_outline_blank"]'></custom-toggle-button>
                <custom-toggle togglers='["light_mode","dark_mode","wb_sunny"]'></custom-toggle>
                <custom-dropdown-menu>
                  <custom-list-item type="menu"
                    ><custom-icon slot="start">palette</custom-icon>Theme</custom-list-item
                  >
                  <custom-list-item type="menu"
                    ><custom-icon slot="start">view_quilt</custom-icon>Layout</custom-list-item
                  >
                  <custom-list-item type="menu"
                    ><custom-icon slot="start">schedule</custom-icon>Time</custom-list-item
                  >
                </custom-dropdown-menu>
              </div>
            </div>
          </section>

          <section class="panel" route="qa">
            <div class="surface stack">
              <h2>All components QA</h2>
              <p class="picker-state">Compact snapshot route for quick visual regression checks.</p>

              <div class="cluster">
                <custom-banner>Banner preview</custom-banner>
                <custom-divider></custom-divider>
              </div>

              <div class="cluster">
                <custom-button type="text" label="Text"></custom-button>
                <custom-button type="filled" label="Filled"></custom-button>
                <custom-icon-button icon="menu" type="outlined"></custom-icon-button>
                <custom-toggle-button togglers='["check_box","check_box_outline_blank"]'></custom-toggle-button>
                <custom-toggle togglers='["dark_mode","light_mode"]'></custom-toggle>
              </div>

              <custom-card type="outlined">
                <span slot="headline">Compact card</span>
                <span slot="subline">QA surface</span>
                <p slot="supportingText">Use this section to quickly verify baseline rendering after changes.</p>
                <div slot="actions" class="cluster">
                  <custom-button type="outlined" label="Inspect"></custom-button>
                </div>
              </custom-card>

              <div class="cluster">
                <custom-menu>
                  <custom-list-item type="menu"><custom-icon slot="start">info</custom-icon>Menu item</custom-list-item>
                </custom-menu>

                <custom-dropdown-menu>
                  <custom-list-item type="menu"
                    ><custom-icon slot="start">schedule</custom-icon>Dropdown item</custom-list-item
                  >
                </custom-dropdown-menu>
              </div>

              <div class="cluster">
                <custom-tabs>
                  <custom-tab>One</custom-tab>
                  <custom-tab>Two</custom-tab>
                </custom-tabs>
                <custom-time-picker value="09:15" minute-step="15"></custom-time-picker>
              </div>
            </div>
          </section>

          <section class="panel" route="buttons">
            <div class="surface stack">
              <h2>Buttons</h2>
              <div class="cluster">
                <custom-button type="text" label="Text"></custom-button>
                <custom-button type="filled" label="Filled"></custom-button>
                <custom-button type="elevated" label="Elevated"></custom-button>
                <custom-button type="outlined" label="Outlined"></custom-button>
                <custom-button type="tonal" label="Tonal"></custom-button>
                <custom-button type="tertiary" label="Tertiary"></custom-button>
              </div>
              <div class="cluster">
                <custom-icon-button icon="menu"></custom-icon-button>
                <custom-icon-button icon="menu" type="filled"></custom-icon-button>
                <custom-icon-button icon="menu" type="elevated"></custom-icon-button>
                <custom-icon-button icon="menu" type="outlined"></custom-icon-button>
                <custom-icon-button icon="menu" type="tonal"></custom-icon-button>
              </div>
            </div>
          </section>

          <section class="panel" route="cards">
            <div class="surface">
              <h2>Cards</h2>
              <div class="cards-grid">
                <custom-card type="filled">
                  <span slot="headline">Filled card</span>
                  <span slot="subline">Content-focused</span>
                  <p slot="supportingText">Soft container with high contrast text for compact summaries.</p>
                  <div slot="actions" class="cluster">
                    <custom-button type="text" label="Read"></custom-button>
                  </div>
                </custom-card>

                <custom-card type="outlined">
                  <span slot="headline">Outlined card</span>
                  <span slot="subline">Data snapshots</span>
                  <p slot="supportingText">Great for dashboards where separation without heavy elevation is needed.</p>
                  <div slot="actions" class="cluster">
                    <custom-button type="outlined" label="Details"></custom-button>
                  </div>
                </custom-card>

                <custom-card type="tertiary">
                  <img
                    slot="image"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80"
                    alt="Colorful abstract view"
                  />
                  <span slot="headline">Media card</span>
                  <span slot="subline">Visual preview</span>
                  <div slot="actions" class="cluster">
                    <custom-button type="tertiary" label="Open"></custom-button>
                  </div>
                </custom-card>
              </div>
            </div>
          </section>

          <section class="panel" route="navigation">
            <div class="surface stack">
              <h2>Navigation patterns</h2>
              <custom-tabs round>
                <custom-tab><custom-icon icon="home"></custom-icon>Home</custom-tab>
                <custom-tab><custom-icon icon="widgets"></custom-icon>Components</custom-tab>
                <custom-tab><custom-icon icon="explore"></custom-icon>Explore</custom-tab>
              </custom-tabs>

              <custom-menu>
                <custom-list-item type="menu"
                  ><custom-icon slot="start">dashboard</custom-icon>Dashboard</custom-list-item
                >
                <custom-list-item type="menu"
                  ><custom-icon slot="start">analytics</custom-icon>Analytics</custom-list-item
                >
                <custom-list-item type="menu"
                  ><custom-icon slot="start">settings</custom-icon>Settings</custom-list-item
                >
              </custom-menu>
            </div>
          </section>

          <section class="panel" route="dialogs">
            <div class="surface stack">
              <h2>Dialog interactions</h2>
              <div class="cluster">
                <custom-button id="open-dialog" type="filled" label="Open dialog"></custom-button>
                <custom-button id="open-fullscreen-dialog" type="tonal" label="Open fullscreen dialog"></custom-button>
              </div>

              <custom-dialog id="demo-dialog">
                <span slot="title">Delete draft?</span>
                <p>Deleting this draft cannot be undone. You can still duplicate it before deleting.</p>
                <div slot="actions" class="cluster">
                  <custom-button type="text" action="cancel" label="Cancel"></custom-button>
                  <custom-button type="filled" action="confirm" label="Delete"></custom-button>
                </div>
              </custom-dialog>

              <custom-dialog id="demo-dialog-fullscreen" fullscreen>
                <span slot="title">Planner</span>
                <p>
                  Fullscreen dialog mode can host larger editing workflows while preserving the same action and close
                  behavior.
                </p>
                <div slot="actions" class="cluster">
                  <custom-button type="text" action="close" label="Close"></custom-button>
                </div>
              </custom-dialog>
            </div>
          </section>

          <section class="panel" route="time-picker">
            <div class="surface stack">
              <h2>Material time picker</h2>
              <p class="picker-state">Choose a time and confirm to emit a live time-change event.</p>

              <custom-time-picker id="demo-time-picker" value="14:35" use-24-hour minute-step="5"></custom-time-picker>

              <div class="panel-footer">
                <div class="chip">
                  <custom-icon icon="schedule"></custom-icon>
                  <span id="time-picker-output">Selected: 14:35</span>
                </div>
                <custom-button id="toggle-12-24" type="outlined" label="Switch to 12h"></custom-button>
              </div>
            </div>
          </section>
        </custom-pages>
      </custom-drawer-layout>
    `
  }
}
