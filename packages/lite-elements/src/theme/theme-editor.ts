import { customElement, LiteElement, css, html, listen, property } from '@vandeurenglenn/lite'

const TOKENS = ['--md-sys-color-primary', '--md-sys-color-primary-container', '--md-sys-color-on-primary', '--md-sys-color-on-primary-container'] as const

@customElement('custom-theme-editor')
export class CustomThemeEditor extends LiteElement {
  @property({ type: String, reflect: true })
  accessor accent: string = '#a78bfa'

  constructor() {
    super()
    this.addConnectionEffect(() => {
      const root = document.documentElement
      const previous = new Map(TOKENS.map((token) => [token, root.style.getPropertyValue(token)]))
      this.#apply(this.accent)
      return () => {
        for (const [token, value] of previous) {
          if (value) root.style.setProperty(token, value)
          else root.style.removeProperty(token)
        }
      }
    })
  }

  @listen('click', { target: '.preset' })
  onPreset(event: Event): void {
    const accent = (event.target as HTMLElement).closest<HTMLElement>('.preset')?.dataset.accent
    if (accent) this.accent = accent
  }

  @listen('input', { target: 'input[type="color"]' })
  onColorInput(event: Event): void {
    this.accent = (event.target as HTMLInputElement).value
  }

  onChange(propertyKey: string, value: unknown): void {
    if (propertyKey === 'accent' && typeof value === 'string') this.#apply(value)
  }

  #apply(accent: string): void {
    const root = document.documentElement
    root.style.setProperty('--md-sys-color-primary', accent)
    root.style.setProperty('--md-sys-color-primary-container', `color-mix(in srgb, ${accent} 32%, var(--md-sys-color-surface-container-high))`)
    root.style.setProperty('--md-sys-color-on-primary', '#ffffff')
    root.style.setProperty('--md-sys-color-on-primary-container', '#ffffff')
    this.dispatchEvent(new CustomEvent('theme-change', { detail: { accent }, bubbles: true, composed: true }))
  }

  static styles = [css`
    :host { display: grid; gap: 16px; }
    .presets { display: flex; flex-wrap: wrap; gap: 10px; }
    button, label { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--md-sys-color-outline-variant); border-radius: 999px; background: var(--md-sys-color-surface-container); color: inherit; font: inherit; cursor: pointer; }
    button span { width: 16px; height: 16px; border-radius: 50%; }
    input { width: 28px; height: 22px; padding: 0; border: 0; background: transparent; }
    .preview { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px; border-radius: 22px; background: color-mix(in srgb, var(--md-sys-color-primary) 24%, var(--md-sys-color-surface-container-high)); }
    strong { font: 600 1.3rem/1.1 'Space Grotesk', sans-serif; }
  `]

  render() {
    return html`
      <div class="presets">
        <button class="preset" data-accent="#a78bfa"><span style="background:#a78bfa"></span>Violet</button>
        <button class="preset" data-accent="#65a30d"><span style="background:#65a30d"></span>Lime</button>
        <button class="preset" data-accent="#06b6d4"><span style="background:#06b6d4"></span>Cyan</button>
        <button class="preset" data-accent="#f97316"><span style="background:#f97316"></span>Sunset</button>
        <label>Custom accent <input type="color" .value=${this.accent} /></label>
      </div>
      <div class="preview"><div><small>Live preview</small><br /><strong>One token changes the mood</strong></div><slot></slot></div>
    `
  }
}
