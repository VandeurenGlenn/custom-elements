import { LiteElement } from '@vandeurenglenn/lite'

export const FileReaderMixin = (Base: typeof LiteElement) =>
  class FileReaderMixin extends Base {
    readAsDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(file)
      })
    }
  }
