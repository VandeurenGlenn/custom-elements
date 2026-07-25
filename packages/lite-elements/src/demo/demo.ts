import { customElement, LiteElement, html, css, listen, query } from '@vandeurenglenn/lite'
import './../elements.js'
import './code.js'

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

  @listen('click', { target: '#demo-prompt' })
  async openPrompt(): Promise<void> {
    await (globalThis as typeof globalThis & { customPrompt?: (title: string) => Promise<string> }).customPrompt?.('Try a prompt')
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

      .showcase-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 14px;
        width: 100%;
      }

      .example-card {
        display: grid;
        align-content: start;
        gap: 12px;
        min-width: 0;
        padding: 16px;
        border: 1px solid var(--demo-line);
        border-radius: 22px;
        background: color-mix(in srgb, var(--md-sys-color-surface-container-highest) 48%, transparent);
      }

      .example-card h3 {
        margin: 0;
        font: 600 1rem/1.2 'Space Grotesk', sans-serif;
      }

      .example-card p {
        margin: 0;
        color: var(--md-sys-color-on-surface-variant);
        font-size: 0.84rem;
        line-height: 1.45;
      }

      .example-preview {
        display: flex;
        min-height: 76px;
        align-items: center;
        gap: 10px;
        padding: 14px;
        border-radius: 16px;
        background: var(--md-sys-color-surface-container);
      }

      .example-card demo-code {
        display: block;
        max-height: 120px;
        overflow: auto;
        margin: 0;
        padding: 10px;
        border-radius: 14px;
        background: color-mix(in srgb, var(--md-sys-color-surface) 75%, transparent);
        font-size: 0.72rem;
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

      .cards-grid > custom-card {
        display: block;
        width: 100%;
        min-width: 0;
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

      .layout-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }

      .layout-demo {
        position: relative;
        min-height: 230px;
        overflow: hidden;
        border: 1px solid var(--demo-line);
        border-radius: 22px;
        background: var(--md-sys-color-surface-container);
      }

      .layout-demo custom-top-app-bar {
        display: block;
        height: 64px;
      }

      .layout-demo custom-pane,
      .layout-demo custom-rail {
        --custom-pane-width: 190px;
      }

      .layout-content {
        display: grid;
        gap: 8px;
        padding: 18px;
      }

      .layout-content strong {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.1rem;
      }

      .layout-content span {
        color: var(--md-sys-color-on-surface-variant);
        line-height: 1.45;
      }

      .icon-set-example {
        display: grid;
        gap: 10px;
        padding: 14px;
        border: 1px solid var(--demo-line);
        border-radius: 18px;
        background: color-mix(in srgb, var(--md-sys-color-surface-container-highest) 48%, transparent);
      }

      .icon-set-example custom-icon {
        --custom-icon-size: 28px;
        --custom-icon-color: var(--md-sys-color-primary);
      }

      .icon-set-example code {
        color: var(--md-sys-color-on-surface-variant);
        font: 0.78rem/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      .theme-presets {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .theme-preset,
      .theme-color {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border: 1px solid var(--demo-line);
        border-radius: 999px;
        background: var(--md-sys-color-surface-container);
        color: var(--md-sys-color-on-surface);
        font: inherit;
        cursor: pointer;
      }

      .theme-preset span {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }

      .theme-color input {
        width: 28px;
        height: 22px;
        padding: 0;
        border: 0;
        background: transparent;
      }

      .theme-preview {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 24px;
        border-radius: 24px;
        background: color-mix(in srgb, var(--demo-accent, var(--md-sys-color-primary)) 24%, var(--md-sys-color-surface-container-high));
      }

      .theme-preview div:first-child {
        display: grid;
        gap: 6px;
      }

      .theme-preview strong {
        font: 600 1.35rem/1.1 'Space Grotesk', sans-serif;
      }

      .theme-preview span {
        color: var(--md-sys-color-on-surface-variant);
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

        .layout-grid {
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
            <custom-drawer-item route="layouts">Layouts</custom-drawer-item>
            <custom-drawer-item route="more">More components</custom-drawer-item>
            <custom-drawer-item route="dialogs">Dialogs</custom-drawer-item>
            <custom-drawer-item route="foundations">Foundations</custom-drawer-item>
            <custom-drawer-item route="feedback">Feedback</custom-drawer-item>
            <custom-drawer-item route="theme-lab">Theme lab</custom-drawer-item>
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
              <h2>Component catalog</h2>
              <p class="picker-state">Every tile includes a live preview and the HTML used to create it.</p>
              <div class="showcase-grid">
                <div class="example-card"><h3>Banner</h3><p>Short, high-priority feedback.</p><div class="example-preview"><custom-banner>Banner preview</custom-banner></div><demo-code .code=${'<custom-banner>Banner preview</custom-banner>'}></demo-code></div>
                <div class="example-card"><h3>Buttons</h3><p>Five visual treatments from one element.</p><div class="example-preview cluster"><custom-button type="filled" label="Filled"></custom-button><custom-button type="outlined" label="Outlined"></custom-button></div><demo-code .code=${'<custom-button type="filled" label="Filled"></custom-button>'}></demo-code></div>
                <div class="example-card"><h3>Card</h3><p>Content, supporting text, and actions.</p><div class="example-preview"><custom-card type="outlined"><span slot="headline">Compact card</span><span slot="supportingText">A useful surface.</span></custom-card></div><demo-code .code=${'<custom-card type="outlined">\n  <span slot="headline">Compact card</span>\n</custom-card>'}></demo-code></div>
                <div class="example-card"><h3>Navigation</h3><p>Tabs, menus, and list items.</p><div class="example-preview"><custom-tabs><custom-tab>One</custom-tab><custom-tab>Two</custom-tab></custom-tabs></div><demo-code .code=${'<custom-tabs>\n  <custom-tab>One</custom-tab>\n</custom-tabs>'}></demo-code></div>
                <div class="example-card"><h3>Time picker</h3><p>Interactive hour and minute selection.</p><div class="example-preview"><custom-time-picker value="09:15" minute-step="15"></custom-time-picker></div><demo-code .code=${'<custom-time-picker value="09:15" minute-step="15"></custom-time-picker>'}></demo-code></div>
                <div class="example-card"><h3>Feedback</h3><p>Toggle states and icon actions.</p><div class="example-preview cluster"><custom-toggle-button togglers='["check_box","check_box_outline_blank"]'></custom-toggle-button><custom-icon-button icon="menu" type="outlined"></custom-icon-button></div><demo-code .code=${'<custom-toggle-button togglers="[&quot;check_box&quot;,&quot;check_box_outline_blank&quot;]"></custom-toggle-button>'}></demo-code></div>
              </div>
            </div>
          </section>

          <section class="panel" route="buttons">
            <div class="surface stack">
              <h2>Buttons</h2>
              <div class="showcase-grid">
                <div class="example-card"><h3>Filled</h3><div class="example-preview"><custom-button type="filled" label="Continue"></custom-button></div><demo-code .code=${'<custom-button type="filled" label="Continue"></custom-button>'}></demo-code></div>
                <div class="example-card"><h3>Outlined</h3><div class="example-preview"><custom-button type="outlined" label="Learn more"></custom-button></div><demo-code .code=${'<custom-button type="outlined" label="Learn more"></custom-button>'}></demo-code></div>
                <div class="example-card"><h3>Icon buttons</h3><div class="example-preview cluster"><custom-icon-button icon="menu" type="filled"></custom-icon-button><custom-icon-button icon="settings" type="outlined"></custom-icon-button></div><demo-code .code=${'<custom-icon-button icon="settings" type="outlined"></custom-icon-button>'}></demo-code></div>
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
              <demo-code .code=${'<custom-card type="filled">\n  <span slot="headline">Filled card</span>\n  <p slot="supportingText">Supporting text</p>\n  <div slot="actions">…</div>\n</custom-card>'}></demo-code>
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

          <section class="panel" route="layouts">
            <div class="surface stack">
              <h2>Layout patterns</h2>
              <p class="picker-state">The same primitives used by the studio shell, shown as composable building blocks.</p>
              <div class="layout-grid">
                <div class="layout-demo">
                  <custom-top-app-bar type="small">
                    <custom-icon-button slot="start" icon="menu"></custom-icon-button>
                    <span slot="title">Top app bar</span>
                    <custom-icon-button slot="end" icon="more_vert"></custom-icon-button>
                  </custom-top-app-bar>
                  <div class="layout-content">
                    <strong>Small, medium, and large</strong>
                    <span>App bars respond to scroll state and keep actions anchored.</span>
                  </div>
                </div>

                <div class="layout-demo">
                  <custom-rail open>
                    <span slot="headline">Rail</span>
                    <div slot="content" class="layout-content">
                      <custom-icon icon="home"></custom-icon>
                      <custom-icon icon="widgets"></custom-icon>
                      <custom-icon icon="settings"></custom-icon>
                    </div>
                  </custom-rail>
                  <div class="layout-content">
                    <strong>Navigation rail</strong>
                    <span>Compact navigation for spacious desktop layouts.</span>
                  </div>
                </div>

                <div class="layout-demo">
                  <custom-supporting-pane open variant="expanded" id="demo-supporting-pane">
                    <div class="layout-content">
                      <strong>Main content</strong>
                      <span>Supporting content can sit beside the primary task.</span>
                    </div>
                    <div slot="supporting-content" class="layout-content">
                      <strong>Supporting pane</strong>
                      <span>Details, filters, or contextual actions.</span>
                    </div>
                  </custom-supporting-pane>
                </div>

                <div class="layout-demo">
                  <custom-pane open right id="demo-pane">
                    <span slot="headline">Pane</span>
                    <div slot="content" class="layout-content">
                      <strong>Modal or persistent</strong>
                      <span>Use a pane for focused navigation and secondary tasks.</span>
                    </div>
                  </custom-pane>
                  <div class="layout-content">
                    <strong>Flexible pane</strong>
                    <span>Left and right placement, mobile mode, and custom content slots.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="panel" route="more">
            <div class="surface stack">
              <h2>More components</h2>
              <p class="picker-state">Every public component gets a small, practical example here.</p>

              <div class="surface stack">
                <h2>Forms &amp; time inputs</h2>
                <div class="cluster">
                  <text-field>
                    <custom-icon slot="leading-icon" icon="search"></custom-icon>
                    <input aria-label="Search" placeholder="Search components" />
                  </text-field>
                  <custom-upload-file multiple></custom-upload-file>
                  <custom-time-picker-input></custom-time-picker-input>
                  <custom-time-picker-minute-field></custom-time-picker-minute-field>
                </div>
              </div>

              <div class="surface stack">
                <h2>Summaries</h2>
                <custom-summary>
                  <div slot="left" class="layout-content">
                    <strong>Primary content</strong>
                    <span>Summary layouts pair a main column with a supporting column.</span>
                  </div>
                  <div slot="right" class="layout-content">
                    <strong>Supporting content</strong>
                    <span>Responsive behavior is built into the element.</span>
                  </div>
                </custom-summary>
                <custom-summary-mirror>
                  <div slot="left" class="layout-content"><strong>Mirrored left</strong></div>
                  <div slot="right" class="layout-content"><strong>Mirrored right</strong></div>
                </custom-summary-mirror>
              </div>

              <div class="surface stack">
                <h2>Dropdowns, drawers &amp; prompts</h2>
                <div class="cluster">
                  <div class="layout-demo">
                    <custom-dropdown open>
                      <custom-list-item type="menu">Dropdown item</custom-list-item>
                      <custom-list-item type="menu">Another item</custom-list-item>
                    </custom-dropdown>
                  </div>
                  <custom-drawer-button id="demo-drawer" label="Open drawer"></custom-drawer-button>
                  <custom-button id="demo-prompt" type="tonal" label="Open prompt"></custom-button>
                </div>
                <custom-drawer id="demo-drawer" open>
                  <span slot="headline">Standalone drawer</span>
                  <div slot="content" class="layout-content"><span>A drawer can be used independently of the shell.</span></div>
                </custom-drawer>
              </div>

              <div class="surface stack">
                <h2>Upload image</h2>
                <p class="picker-state">Camera and library flows are available as a composable upload surface.</p>
                <custom-upload-image></custom-upload-image>
              </div>
            </div>
          </section>

          <section class="panel" route="theme-lab">
            <div class="surface stack theme-lab">
              <h2>Theme lab</h2>
              <p class="picker-state">Try a preset or create an accent color. The playground updates live through CSS custom properties.</p>
              <custom-theme-editor>
                <div class="cluster"><custom-button type="filled" label="Primary action"></custom-button><custom-button type="outlined" label="Secondary"></custom-button></div>
              </custom-theme-editor>
              <demo-code .code=${'<custom-theme-editor>\n  <custom-button type="filled" label="Primary action"></custom-button>\n</custom-theme-editor>'}></demo-code>
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

          <section class="panel" route="foundations">
            <div class="surface stack">
              <h2>Foundations</h2>
              <p class="picker-state">The small primitives that give larger interfaces their rhythm and depth.</p>
              <div class="cluster">
                <custom-elevation level="1"><span>Elevation 1</span></custom-elevation>
                <custom-elevation level="2"><span>Elevation 2</span></custom-elevation>
                <custom-elevation level="3"><span>Elevation 3</span></custom-elevation>
              </div>
              <custom-typography>
                <h1 slot="headline">Typography that scales</h1>
                <p slot="supporting-text">Compose expressive type with the same lightweight element model.</p>
              </custom-typography>
              <div class="icon-set-example">
                <custom-icon-set set-name="studio">
                  <template>
                    <span name="sparkle">@symbol-auto_awesome</span>
                    <span name="favorite">@symbol-favorite</span>
                    <span name="code">@symbol-code</span>
                  </template>
                </custom-icon-set>
                <div class="cluster">
                  <custom-icon set-name="studio" icon="sparkle"></custom-icon>
                  <custom-icon set-name="studio" icon="favorite"></custom-icon>
                  <custom-icon set-name="studio" icon="code"></custom-icon>
                </div>
                <code>&lt;custom-icon-set set-name="studio"&gt; … &lt;/custom-icon-set&gt;</code>
              </div>
              <div class="cluster">
                <custom-divider></custom-divider>
                <custom-icon icon="palette"></custom-icon>
                <custom-icon icon="widgets"></custom-icon>
                <custom-icon icon="explore"></custom-icon>
              </div>
            </div>
          </section>

          <section class="panel" route="feedback">
            <div class="surface stack">
              <h2>Feedback &amp; status</h2>
              <p class="picker-state">Try the compact feedback elements used around actions and asynchronous work.</p>
              <div class="cluster">
                <custom-button type="filled" label="Save changes"></custom-button>
                <custom-button type="tonal" label="Undo"></custom-button>
                <custom-fab><custom-icon icon="add"></custom-icon></custom-fab>
              </div>
              <custom-notification title="Changes saved" message="Your component configuration is ready to preview."></custom-notification>
              <custom-notifications open>
                <custom-notification title="Recent activity" message="Notifications can be grouped in a pane."></custom-notification>
              </custom-notifications>
              <custom-list-item>
                <custom-icon slot="start" icon="check_box"></custom-icon>
                <span>Accessible status message</span>
              </custom-list-item>
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
