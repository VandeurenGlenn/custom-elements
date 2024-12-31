import { LiteElement, css, html, property } from '@vandeurenglenn/lite'
// import './../dialog/dialog'

globalThis.customPrompt = (promptTitle: string) => {
  const dialog = document.createElement('custom-prompt') as CustomPrompt
  dialog.promptTitle = promptTitle
  document.body.appendChild(dialog)
  return new Promise<string>((resolve) => {
    dialog.addEventListener('close', ({ detail }: CustomEvent) => {
      dialog.remove()
      resolve(detail)
    })
  })
}

export class CustomPrompt extends LiteElement {
  @property({ type: String })
  accessor promptTitle: string = 'Prompt Title'

  constructor(promptTitle: string) {
    super()
    this.setAttribute('prompt-title', promptTitle)
  }

  cancel = () => this.dispatchEvent(new CustomEvent('close', { detail: undefined }))
  ok = () => this.dispatchEvent(new CustomEvent('close', { detail: this.shadowRoot.querySelector('input').value }))

  static styles = [
    css`
      :host {
        display: contents;
      }

      footer {
        display: flex;
        justify-content: flex-end;
      }

      input {
        background: var(--background);
      }
    `
  ]
  render() {
    return html`
      <custom-dialog>
        <header slot="header">${this.promptTitle}</header>
        <input />
        <footer slot="actions">
          <custom-button label="Cancel" action="cancel" @click=${this.cancel}></custom-button>
          <custom-button label="Ok" action="ok" @click=${this.ok}></custom-button>
        </footer>
      </custom-dialog>
    `
  }
}
