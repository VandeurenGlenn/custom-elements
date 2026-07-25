import { LiteElement, html, css, property, query, customElement } from '@vandeurenglenn/lite'
import { render } from 'lit-html'
import '@material/web/button/filled-tonal-button.js'
import '@material/web/textfield/outlined-text-field.js'
import { DeviceApi } from './../apis/device.js'
import '@material/web/progress/circular-progress.js'

import './../dialog/dialog.js'
import './../icon/icon.js'
import './../tabs/tabs.js'
import './../tabs/tab.js'
import './../selector/selector.js'
import './../pages/pages.js'
import { FileReaderMixin } from '../mixins/file-reader-mixin.js'
import type { CustomDialog } from './../dialog/dialog.js'

type UploadFields = Record<string, string>
type UploadImage = { data: string | { name: string; data: string }[] | null; type: string | null }
type LibraryImage = { firebaseKey: string; link: string }
type SelectableElement = HTMLElement & { select(value: string): void }

declare type actionResult = {
  action: string
  fields: UploadFields
  image: UploadImage
}

@customElement('custom-upload-image')
export class CustomUploadImage extends FileReaderMixin(LiteElement) {
  deviceApi: DeviceApi = new DeviceApi()
  @query('custom-pages')
  accessor pages!: SelectableElement

  @property({ type: Array, consumes: true })
  accessor images: LibraryImage[] = []

  @query('custom-tabs')
  accessor selector!: SelectableElement

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false

  @property({ type: Boolean })
  accessor frontCameraDisabled: boolean = false

  @property({ type: Boolean })
  accessor rearCameraDisabled: boolean = false

  @property({ type: Boolean, attribute: 'has-library' })
  accessor hasLibrary: boolean = false

  static styles = [
    css`
      :host {
        display: block;
      }

      h5 {
        margin: 0;
      }

      custom-tab.custom-selected {
        background: var(--md-sys-color-tertiary);
        --custom-icon-color: var(--md-sys-color-on-tertiary);
        border: none;
      }

      custom-tab.custom-selected span,
      custom-tab.custom-selected custom-icon {
        color: var(--md-sys-color-on-tertiary);
        --custom-icon-color: var(--md-sys-color-on-tertiary);
      }

      custom-tab {
        gap: 8px;
        height: 40px;
        padding: 0 12px;
        box-sizing: border-box;
        width: auto;
        border-radius: 20px;
        font: var(--_supporting-text-type);
      }

      custom-tabs {
        height: 40px;
      }

      section {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        min-height: 168px;
        position: absolute;
        transform: scale(0);
        justify-content: center;
        align-items: center;
      }

      section[route='camera'] {
        overflow-y: hidden;
      }

      section.custom-selected {
        transform: scale(1);
        position: relative;
      }
      md-outlined-text-field {
        padding-top: 12px;
      }

      .camera-actions {
        width: 100%;
        position: absolute;
        bottom: 0;
        margin-bottom: 3px;
      }

      section[route='camera'] flex-container {
        height: 320px;
      }

      flex-column {
        width: auto;
      }

      flex-container video,
      img:not([data-variant='icon']) {
        height: -webkit-fill-available;
        width: -webkit-fill-available;
      }

      [route='library'] img {
        width: 150px;
        cursor: pointer;
      }

      [data-variant='icon'] {
        height: 48px;
        width: 48px;
      }

      md-dialog {
        --_container-color: #2d2f31;
      }
    `
  ]

  get #dialog(): CustomDialog {
    return this.shadowRoot!.querySelector('custom-dialog') as CustomDialog
  }

  get #cameraPreview(): HTMLVideoElement {
    return this.shadowRoot!.querySelector('.camera-preview') as HTMLVideoElement
  }

  #cameraFacingMode = 'user'
  #image: UploadImage = { data: null, type: null }

  #takePhoto = async () => {
    // this._previewEl.stop();
    // this._previewEl.srcObject = null;
    const blob = await this.deviceApi.camera.takePhoto(this.#cameraFacingMode)

    // const fd = new FormData();
    // fd.append('image', blob);

    this.#image.data = (await this.readAsDataURL(blob)) as string
    this.#image.type = 'base64'

    const img = document.createElement('img')
    img.src = this.#image.data as string
    this.shadowRoot!.querySelector('flex-container')?.replaceChild(img.cloneNode(true), this.#cameraPreview)
  }

  #selectFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true

    input.addEventListener(
      'change',
      async () => {
        const selectedFiles = Array.from(input.files ?? [])
        if (selectedFiles.length === 0) return

        const files = await Promise.all(
          selectedFiles.map(async (file) => {
            const data = await this.readAsDataURL(file)
            const item = document.createElement('md-list-item')
            item.setAttribute('headline', file.name)
            item.setAttribute('noninteractive', '')
            item.innerHTML = `
          <img data-variant="icon" slot="start" src="${data}">
          <md-standard-icon-button slot="end"><custom-icon>delete</custom-icon></md-standard-icon-button>
        `
            item.addEventListener('click', () => item.remove(), { once: true })
            this.shadowRoot?.querySelector('section[route="file"]')?.appendChild(item)
            return { name: file.name, data }
          })
        )

        this.#image.data = files as { name: string; data: string }[]
        this.#image.type = 'base64[]'
      },
      { once: true }
    )

    input.click()
  }

  onChange(propertyKey: string, value: unknown): void {
    if (propertyKey === 'open' && value) {
      this.hasLibrary ? this.select('library') : this.select('url')
    }
  }

  select(value: string): void {
    this.selector.select(value)
  }

  #onSelected = async ({ detail }: CustomEvent<string>) => {
    this.pages.select(detail)
    if (detail === 'camera') {
      this.frontCameraDisabled = !(await this.deviceApi.hasFrontCam())
      this.rearCameraDisabled = !(await this.deviceApi.hasBackCam())
      await this.deviceApi.camera.preview(this.#cameraPreview, this.#cameraFacingMode)
    }
  }

  #onlibclick = (hash: string) => {
    this.#image.data = hash
    this.#image.type = 'library'
  }

  show() {
    this.#dialog.open = true
  }

  #addImageTemplate() {
    return html`
      <form id="form-content" method="dialog">
        <custom-tabs attr-for-selected="route" @selected=${this.#onSelected}>
          ${this.hasLibrary
            ? html`
                <custom-tab route="library">
                  <custom-icon>photo_library</custom-icon>
                  <span>library</span>
                </custom-tab>
              `
            : ''}
          <custom-tab route="url">
            <custom-icon>link</custom-icon>
            <span>url</span>
          </custom-tab>

          <custom-tab route="camera">
            <custom-icon>camera</custom-icon>
            <span>camera</span>
          </custom-tab>

          <custom-tab route="file">
            <custom-icon>upload</custom-icon>
            <span>file</span>
          </custom-tab>
          <flex-it></flex-it>
        </custom-tabs>
        <custom-pages attr-for-selected="route">
          ${this.hasLibrary
            ? html`
                <section route="library">
                  <flex-wrap-around>
                    ${this.images.map(
                      (image) => html`
                        <img
                          @click=${() => this.#onlibclick(image.firebaseKey)}
                          src=${`${location.origin}/api/image?image=${image.link.replace('.png', 'b.png')}`}
                        />
                      `
                    )}
                  </flex-wrap-around>
                </section>
              `
            : ''}
          <section route="url">
            <flex-column>
              add image using a link/url
              <md-outlined-text-field label="url" input-field="url"></md-outlined-text-field>
            </flex-column>
          </section>

          <section route="camera">
            <flex-container>
              <video autoplay mute="true" class="camera-preview"></video>
            </flex-container>

            <flex-row class="camera-actions">
              <flex-it flex="2"></flex-it>

              <md-standard-icon-button
                @click=${() => (this.#cameraFacingMode = 'user')}
                ?disabled=${this.frontCameraDisabled}
              >
                <custom-icon>photo_camera_front</custom-icon>
              </md-standard-icon-button>

              <flex-it flex="1"></flex-it>

              <md-standard-icon-button style="transform: scale(1.66);" @click=${this.#takePhoto}>
                <custom-icon>photo_camera</custom-icon>
              </md-standard-icon-button>

              <flex-it flex="1"></flex-it>

              <md-standard-icon-button
                @click=${() => (this.#cameraFacingMode = 'environment')}
                ?disabled=${this.rearCameraDisabled}
              >
                <custom-icon>photo_camera_back</custom-icon>
              </md-standard-icon-button>

              <flex-it flex="2"></flex-it>
            </flex-row>
          </section>

          <section route="file">
            <md-filled-tonal-button @click=${this.#selectFile}>
              <custom-icon slot="icon">upload</custom-icon>
              select
            </md-filled-tonal-button>
          </section>
        </custom-pages>
      </form>

      <flex-row slot="actions">
        <md-text-button form="form-content" value="cancel">cancel</md-text-button>
        <flex-one></flex-one>
        <md-text-button form="form-content" value="submit">submit</md-text-button>
      </flex-row>
    `
  }

  #onAction = (): Promise<actionResult> =>
    new Promise((resolve) => {
      this.#dialog.addEventListener(
        'close',
        ((event: Event) => {
          const { detail: action } = event as CustomEvent<string>
          const inputFields = Array.from(
            this.shadowRoot!.querySelectorAll<HTMLElement & { label: string; value: string }>('[input-field]')
          )
          const fields: UploadFields = {}

          for (const field of inputFields) {
            fields[field.label] = field.value
          }

          if (!this.#image.type) {
            const inputField = this.shadowRoot!.querySelector('[input-field]') as HTMLInputElement | null
            this.#image.type = inputField ? 'url' : null
            this.#image.data = inputField?.value ?? null
          }

          const image: UploadImage = {
            type: this.#image.type,
            data: Array.isArray(this.#image.data) ? [...this.#image.data] : this.#image.data
          }

          resolve({ action, fields, image })

          this.#image.data = null
          this.#image.type = null

          this.deviceApi.camera.close()
          render(html``, this.#dialog)
        }) as EventListener,
        { once: true }
      )
    })

  #busytemplate(title: string, description?: string) {
    return html`
      <flex-row slot="title">
        <h5>${title}</h5>
      </flex-row>
      <flex-column>
        <flex-column> ${description} </flex-column>

        <flex-row style="justify-content: center; width: 100%;">
          <md-circular-progress indeterminate></md-circular-progress>
        </flex-row>
      </flex-column>
    `
  }
  async addImage() {
    render(this.#addImageTemplate(), this.#dialog)
    this.show()
    return this.#onAction()
  }

  async busy(title: string, description?: string) {
    render(this.#busytemplate(title, description), this.#dialog)
    this.show()
  }

  close() {
    this.#dialog.open = false
  }

  render() {
    return html` <custom-dialog .open=${this.open}></custom-dialog> `
  }
}
