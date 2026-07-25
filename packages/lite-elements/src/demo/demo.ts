import { customElement, LiteElement, html, css, listen, query } from '@vandeurenglenn/lite'
import './../elements.js'

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

  @listen('selected', { target: 'custom-selector' })
  onSelectorSelected({ detail }: CustomEvent<string>) {
    document.dispatchEvent(new CustomEvent('custom-scroll', { detail: { scrolling: false } }))
    this.pages.select(detail)
    localStorage.setItem('last-selected', detail)
  }

  firstRender() {
    const lastSelected = localStorage.getItem('last-selected')
    if (lastSelected) this.#goToRoute(lastSelected)
  }

  @listen('click', { target: '#jump-time-picker' })
  openTimePicker(): void {
    this.#goToRoute('time-picker')
  }

  @listen('click', { target: '#jump-buttons' })
  openButtons(): void {
    this.#goToRoute('buttons')
  }

  @listen('click', { target: '#jump-qa' })
  openQa(): void {
    this.#goToRoute('qa')
  }

  @listen('click', { target: '#open-dialog' })
  openDialog(): void {
    this.dialog.open = true
  }

  @listen('click', { target: '#open-fullscreen-dialog' })
  openFullscreenDialog(): void {
    this.fullscreenDialog.open = true
  }

  @listen('time-change', { target: '#demo-time-picker' })
  onTimeChange({ detail }: CustomEvent<TimeChangeDetail>): void {
    this.timePickerOutput.textContent = `Selected: ${detail.value} (${detail.hour}:${String(detail.minute).padStart(2, '0')} ${detail.meridiem})`
  }

  @listen('click', { target: '#toggle-12-24' })
  toggleHourMode(): void {
    const uses24Hour = this.timePicker.hasAttribute('use-24-hour')
    this.timePicker.toggleAttribute('use-24-hour', !uses24Hour)
    this.toggleHourModeButton.label = uses24Hour ? 'Switch to 24h' : 'Switch to 12h'
  }

  static styles = [
    css`
      :host {
        --demo-line: color-mix(in srgb, var(--md-sys-color-outline-variant) 54%, transparent);
        --demo-glass: color-mix(in srgb, var(--md-sys-color-surface-container-high) 82%, transparent);
        position: absolute;
        inset: 0;
        display: block;
        overflow: hidden;
        font-family: 'DM Sans', sans-serif;
        color: var(--md-sys-color-on-background);
        background:
          radial-gradient(
            circle at 14% 8%,
            color-mix(in srgb, var(--md-sys-color-primary) 24%, transparent),
            transparent 30%
          ),
          radial-gradient(
            circle at 88% 84%,
            color-mix(in srgb, var(--md-sys-color-tertiary) 18%, transparent),
            transparent 34%
          ),
          var(--md-sys-color-background);
      }

      custom-drawer-layout {
        position: absolute;
        inset: 0;
        --custom-drawer-width: 292px;
      }

      .drawer-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
        height: 100%;
        padding: 10px 14px 18px;
      }

      .drawer-hero {
        position: relative;
        overflow: hidden;
        margin: 8px 0 2px;
        padding: 18px;
        border-radius: 24px;
        background:
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--md-sys-color-primary-container) 76%, transparent),
            color-mix(in srgb, var(--md-sys-color-tertiary-container) 58%, transparent)
          );
        border: 1px solid color-mix(in srgb, var(--md-sys-color-primary) 22%, transparent);
        box-shadow: 0 18px 42px color-mix(in srgb, var(--md-sys-color-shadow) 20%, transparent);
      }

      .drawer-hero::after {
        content: '';
        position: absolute;
        width: 92px;
        height: 92px;
        right: -28px;
        bottom: -42px;
        border-radius: 50%;
        background: color-mix(in srgb, var(--md-sys-color-primary) 32%, transparent);
        filter: blur(2px);
      }

      .drawer-kicker {
        margin: 0;
        color: var(--md-sys-color-on-surface-variant);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .drawer-title {
        margin: 6px 0 0;
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(1.12rem, 2.2vw, 1.42rem);
        font-weight: 700;
        letter-spacing: -0.025em;
      }

      .drawer-foot {
        margin-top: auto;
        padding: 12px 14px;
        border-radius: 18px;
        background: color-mix(in srgb, var(--md-sys-color-surface-container) 68%, transparent);
        border: 1px solid var(--demo-line);
        color: var(--md-sys-color-on-surface-variant);
        font-size: 0.78rem;
        line-height: 1.45;
      }

      custom-selector {
        display: flex;
        flex-direction: column;
        gap: 4px;
        overflow-y: auto;
        padding: 2px;
      }

      custom-drawer-item {
        border-radius: 16px;
        transition:
          transform 180ms ease,
          background 180ms ease;
      }

      custom-drawer-item:hover {
        transform: translateX(3px);
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
        gap: 18px;
        padding: clamp(18px, 2.8vw, 36px);
        scrollbar-width: thin;
        scrollbar-color: var(--md-sys-color-outline-variant) transparent;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.75fr);
        gap: 18px;
      }

      .hero-card,
      .surface {
        border-radius: 30px;
        background: var(--demo-glass);
        border: 1px solid var(--demo-line);
        box-shadow:
          0 1px 0 color-mix(in srgb, white 9%, transparent) inset,
          0 22px 60px color-mix(in srgb, var(--md-sys-color-shadow) 14%, transparent);
        backdrop-filter: blur(18px) saturate(1.15);
      }

      .hero-card {
        position: relative;
        overflow: hidden;
        padding: clamp(24px, 4vw, 48px);
      }

      .hero-card:first-child {
        min-height: 285px;
        background:
          radial-gradient(
            circle at 92% 12%,
            color-mix(in srgb, var(--md-sys-color-primary) 28%, transparent),
            transparent 31%
          ),
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--md-sys-color-primary-container) 34%, var(--demo-glass)),
            var(--demo-glass)
          );
      }

      .hero-card:first-child::after {
        content: '</>';
        position: absolute;
        right: clamp(18px, 3vw, 40px);
        bottom: 18px;
        color: color-mix(in srgb, var(--md-sys-color-primary) 18%, transparent);
        font: 700 clamp(4rem, 9vw, 8rem) / 1 'Space Grotesk', sans-serif;
        letter-spacing: -0.12em;
        pointer-events: none;
      }

      .hero-card h1 {
        position: relative;
        z-index: 1;
        max-width: 13ch;
        margin: 14px 0 12px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(2rem, 4.7vw, 4.2rem);
        line-height: 0.98;
        letter-spacing: -0.055em;
      }

      .hero-card p,
      .picker-state {
        position: relative;
        z-index: 1;
        margin: 0;
        color: var(--md-sys-color-on-surface-variant);
        line-height: 1.55;
      }

      .hero-actions {
        position: relative;
        z-index: 1;
        margin-top: 18px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .metrics {
        padding: 12px;
        display: grid;
        gap: 8px;
        align-content: stretch;
      }

      .metric {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 70px;
        background:
          linear-gradient(
            135deg,
            color-mix(in srgb, var(--md-sys-color-surface-container-highest) 90%, transparent),
            color-mix(in srgb, var(--md-sys-color-secondary-container) 28%, transparent)
          );
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline-variant) 35%, transparent);
        border-radius: 22px;
        padding: 14px 16px;
      }

      .metric small {
        display: block;
        color: var(--md-sys-color-on-surface-variant);
      }

      .metric strong {
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(1.05rem, 2vw, 1.35rem);
        letter-spacing: -0.025em;
      }

      .surface {
        padding: clamp(18px, 2.5vw, 28px);
      }

      .surface h2 {
        margin: 0 0 16px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(1.25rem, 2.4vw, 1.7rem);
        letter-spacing: -0.035em;
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
        gap: 16px;
      }

      .cards-grid custom-card {
        transition:
          transform 220ms ease,
          filter 220ms ease;
      }

      .cards-grid custom-card:hover {
        transform: translateY(-5px);
        filter: drop-shadow(0 18px 22px color-mix(in srgb, var(--md-sys-color-shadow) 20%, transparent));
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
        border: 1px solid color-mix(in srgb, var(--md-sys-color-secondary) 18%, transparent);
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

        .hero-card,
        .surface {
          border-radius: 24px;
        }

        .hero-card:first-child {
          min-height: 0;
        }

        .hero-card:first-child::after {
          opacity: 0.5;
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
            <p class="drawer-kicker">Built with Lite</p>
            <p class="drawer-title">Element studio</p>
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
            A living workbench for composing, testing, and refining every element.
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
                <small class="drawer-kicker">Lite Elements · Component Lab</small>
                <h1>Small elements. Beautiful systems.</h1>
                <p>
                  Explore expressive, lightweight building blocks in a tactile playground. Try every state, compose
                  real patterns, and see changes instantly.
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
