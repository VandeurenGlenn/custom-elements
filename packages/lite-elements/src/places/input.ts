import { customElement, html, LiteElement } from '@vandeurenglenn/lite'

@customElement('custom-pane')
export class CustomPlacesInput extends LiteElement {
  static styles = []

  render() {
    return html`<input type="text" placeholder="Search for places..." />`
  }
}
