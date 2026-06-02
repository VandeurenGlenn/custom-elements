import { customElement, LiteElement, css, html, property } from '@vandeurenglenn/lite'

type PickerMode = 'hour' | 'minute'
type Meridiem = 'AM' | 'PM'

@customElement('custom-time-picker')
export class CustomTimePicker extends LiteElement {
  @property({ type: String, reflect: true })
  accessor value: string = '09:00'

  @property({ type: String })
  accessor label: string = 'Select time'

  @property({ type: Boolean, attribute: 'use-24-hour', reflect: true })
  accessor use24Hour: boolean = false

  @property({ type: Number, attribute: 'minute-step' })
  accessor minuteStep: number = 5

  @property({ type: String, reflect: true })
  accessor mode: PickerMode = 'hour'

  @property({ type: Number, attribute: false })
  accessor draftHour24: number = 9

  @property({ type: Number, attribute: false })
  accessor draftMinute: number = 0

  @property({ type: String, attribute: false })
  accessor draftMeridiem: Meridiem = 'AM'

  constructor() {
    super()
    this.#syncDraftFromValue(this.value)
  }

  onChange(propertyKey: string, value: string | number | boolean) {
    if (propertyKey === 'value' && typeof value === 'string') {
      this.#syncDraftFromValue(value)
    }

    if (propertyKey === 'minuteStep' && typeof value === 'number' && (value < 1 || value > 30)) {
      this.minuteStep = 5
    }
  }

  #syncDraftFromValue = (timeValue: string) => {
    const parsed = this.#parseValue(timeValue)
    if (!parsed) return
    this.draftHour24 = parsed.hour24
    this.draftMinute = parsed.minute
    this.draftMeridiem = parsed.meridiem
  }

  #parseValue = (timeValue: string): { hour24: number; minute: number; meridiem: Meridiem } | undefined => {
    const match = /^(\d{1,2}):(\d{2})$/.exec(timeValue.trim())
    if (!match) return undefined

    const hour = Number(match[1])
    const minute = Number(match[2])
    if (Number.isNaN(hour) || Number.isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return undefined
    }

    return {
      hour24: hour,
      minute,
      meridiem: hour >= 12 ? 'PM' : 'AM'
    }
  }

  #twoDigits = (value: number): string => `${value}`.padStart(2, '0')

  #toDisplayHour = (hour24: number): number => {
    if (this.use24Hour) return hour24
    const hour12 = hour24 % 12
    return hour12 === 0 ? 12 : hour12
  }

  #toHour24From12 = (hour12: number, meridiem: Meridiem): number => {
    if (hour12 === 12) return meridiem === 'AM' ? 0 : 12
    return meridiem === 'PM' ? hour12 + 12 : hour12
  }

  #hourOptions = (): number[] => {
    if (this.use24Hour) return Array.from({ length: 24 }, (_, index) => index)
    return Array.from({ length: 12 }, (_, index) => index + 1)
  }

  #minuteOptions = (): number[] => {
    const step = Math.max(1, Math.min(30, this.minuteStep || 5))
    const result: number[] = []
    for (let minute = 0; minute < 60; minute += step) result.push(minute)
    if (result[result.length - 1] !== 59 && step !== 1) result.push(59)
    return result
  }

  #setMode = (mode: PickerMode) => {
    this.mode = mode
  }

  #onHourClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement
    const rawValue = target.dataset.value
    if (!rawValue) return

    const selected = Number(rawValue)
    if (Number.isNaN(selected)) return

    this.draftHour24 = this.use24Hour ? selected : this.#toHour24From12(selected, this.draftMeridiem)
    this.mode = 'minute'
  }

  #onMinuteClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement
    const rawValue = target.dataset.value
    if (!rawValue) return

    const selected = Number(rawValue)
    if (Number.isNaN(selected)) return

    this.draftMinute = selected
  }

  #onMeridiemClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement
    const value = target.dataset.value
    if (value !== 'AM' && value !== 'PM') return

    this.draftMeridiem = value
    if (!this.use24Hour) {
      this.draftHour24 = this.#toHour24From12(this.#toDisplayHour(this.draftHour24), value)
    }
  }

  #cancel = () => {
    this.#syncDraftFromValue(this.value)
  }

  #confirm = () => {
    const nextValue = `${this.#twoDigits(this.draftHour24)}:${this.#twoDigits(this.draftMinute)}`
    this.value = nextValue
    this.dispatchEvent(
      new CustomEvent('time-change', {
        detail: {
          value: this.value,
          hour24: this.draftHour24,
          minute: this.draftMinute,
          hour: this.#toDisplayHour(this.draftHour24),
          meridiem: this.draftMeridiem
        },
        bubbles: true,
        composed: true
      })
    )
  }

  static styles = [
    css`
      :host {
        display: block;
        width: min(100%, 340px);
        border-radius: var(--md-sys-shape-corner-extra-large);
        background: var(--md-sys-color-surface-container-high);
        color: var(--md-sys-color-on-surface);
        box-sizing: border-box;
        padding: 16px;
      }

      .label {
        color: var(--md-sys-color-on-surface-variant);
        font-family: var(--md-sys-typescale-label-large-font-family-name);
        font-size: var(--md-sys-typescale-label-large-font-size);
        line-height: var(--md-sys-typescale-label-large-height);
      }

      .display {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }

      .time-chip,
      .period-chip {
        border: none;
        border-radius: var(--md-sys-shape-corner-medium);
        background: var(--md-sys-color-surface-container-highest);
        color: var(--md-sys-color-on-surface-variant);
        padding: 10px 12px;
        cursor: pointer;
      }

      .time-chip {
        min-width: 74px;
        text-align: center;
        font-family: var(--md-sys-typescale-display-small-font-family-name);
        font-size: var(--md-sys-typescale-display-small-font-size);
        line-height: var(--md-sys-typescale-display-small-height);
        font-weight: var(--md-sys-typescale-display-small-font-weight);
      }

      .separator {
        font-family: var(--md-sys-typescale-display-small-font-family-name);
        font-size: var(--md-sys-typescale-display-small-font-size);
        color: var(--md-sys-color-on-surface-variant);
      }

      .time-chip.active,
      .period-chip.active {
        background: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
      }

      .period {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-inline-start: 8px;
      }

      :host([use-24-hour]) .period {
        display: none;
      }

      .grid {
        margin-top: 16px;
        display: grid;
        gap: 8px;
        max-height: 220px;
        overflow: auto;
        padding-inline-end: 2px;
      }

      .grid.hours {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      :host([use-24-hour]) .grid.hours {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }

      .grid.minutes {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .grid button {
        border: none;
        border-radius: var(--md-sys-shape-corner-full);
        padding: 10px 8px;
        background: var(--md-sys-color-surface-container);
        color: var(--md-sys-color-on-surface);
        cursor: pointer;
        font-family: var(--md-sys-typescale-title-medium-font-family-name);
        font-size: var(--md-sys-typescale-title-medium-font-size);
      }

      .grid button.active {
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
      }

      .actions {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }

      .actions button {
        border: none;
        background: transparent;
        color: var(--md-sys-color-primary);
        border-radius: var(--md-sys-shape-corner-full);
        padding: 10px 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-family: var(--md-sys-typescale-label-large-font-family-name);
        font-size: var(--md-sys-typescale-label-large-font-size);
        font-weight: var(--md-sys-typescale-label-large-font-weight);
        cursor: pointer;
      }

      .actions button:hover,
      .time-chip:hover,
      .period-chip:hover,
      .grid button:hover {
        filter: brightness(0.98);
      }
    `
  ]

  render() {
    const displayHour = this.#toDisplayHour(this.draftHour24)
    const activeHourValue = this.use24Hour ? this.draftHour24 : displayHour
    const hourOptions = this.#hourOptions()
    const minuteOptions = this.#minuteOptions()

    return html`
      <div class="label">${this.label}</div>

      <div class="display">
        <button class="time-chip ${this.mode === 'hour' ? 'active' : ''}" @click=${() => this.#setMode('hour')}>
          ${this.#twoDigits(displayHour)}
        </button>
        <div class="separator">:</div>
        <button class="time-chip ${this.mode === 'minute' ? 'active' : ''}" @click=${() => this.#setMode('minute')}>
          ${this.#twoDigits(this.draftMinute)}
        </button>

        <div class="period">
          <button
            class="period-chip ${this.draftMeridiem === 'AM' ? 'active' : ''}"
            data-value="AM"
            @click=${this.#onMeridiemClick}
          >
            AM
          </button>
          <button
            class="period-chip ${this.draftMeridiem === 'PM' ? 'active' : ''}"
            data-value="PM"
            @click=${this.#onMeridiemClick}
          >
            PM
          </button>
        </div>
      </div>

      ${this.mode === 'hour'
        ? html`
            <div class="grid hours">
              ${hourOptions.map(
                (hour) => html`
                  <button
                    class="${hour === activeHourValue ? 'active' : ''}"
                    data-value="${hour}"
                    @click=${this.#onHourClick}
                  >
                    ${this.#twoDigits(hour)}
                  </button>
                `
              )}
            </div>
          `
        : html`
            <div class="grid minutes">
              ${minuteOptions.map(
                (minute) => html`
                  <button
                    class="${minute === this.draftMinute ? 'active' : ''}"
                    data-value="${minute}"
                    @click=${this.#onMinuteClick}
                  >
                    ${this.#twoDigits(minute)}
                  </button>
                `
              )}
            </div>
          `}

      <div class="actions">
        <button @click=${this.#cancel}>Cancel</button>
        <button @click=${this.#confirm}>OK</button>
      </div>
    `
  }
}
