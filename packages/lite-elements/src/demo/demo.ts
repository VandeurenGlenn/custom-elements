import { customElement, LiteElement, html, css, query } from '@vandeurenglenn/lite'

@customElement('demo-shell')
export class DemoShell extends LiteElement {
  @query('custom-selector')
  accessor selector

  @query('custom-pages')
  accessor pages

  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ]

  async connectedCallback() {
    const onSelected = async ({ detail }) => {
      document.dispatchEvent(new CustomEvent('custom-scroll', { detail: { scrolling: false } }))
      this.pages.select(detail)
      localStorage.setItem('last-selected', detail)
    }

    this.selector.addEventListener('selected', onSelected)

    const lastSelected = localStorage.getItem('last-selected')
    if (lastSelected)
      if (customElements.get('custom-selector')) this.selector.select(lastSelected)
      else {
        await customElements.whenDefined('custom-selector')
        this.selector.select(lastSelected)

        this.pages.select(lastSelected)
      }
  }

  render() {
    return html`
      <custom-drawer-layout class="demo-container">
        <span slot="drawer-headline"> menu </span>

        <flex-column slot="drawer-content">
          <custom-selector attr-for-selected="route" default-selected="banner">
            <custom-drawer-item route="banner">banner</custom-drawer-item>
            <custom-drawer-item route="dialog">dialog</custom-drawer-item>
            <custom-drawer-item route="divider">divider</custom-drawer-item>
            <custom-drawer-item route="buttons">buttons</custom-drawer-item>
            <custom-drawer-item route="cards">cards</custom-drawer-item>
            <custom-drawer-item route="top-app-bar">top-app-bar</custom-drawer-item>
            <custom-drawer-item route="typography">typography</custom-drawer-item>
            <custom-drawer-item route="drawer">drawer</custom-drawer-item>
            <custom-drawer-item route="pane">pane</custom-drawer-item>
            <custom-drawer-item route="supporting-pane">supporting pane</custom-drawer-item>
            <custom-drawer-item route="tabs">tabs</custom-drawer-item>
            <custom-drawer-item route="menu">menu</custom-drawer-item>
            <custom-drawer-item route="dropdown-menu">dropdown-menu</custom-drawer-item>
            <custom-drawer-item route="list-item">list-item</custom-drawer-item>
            <custom-drawer-item route="toggle">toggle</custom-drawer-item>
            <custom-drawer-item route="toggle-button">toggle-button</custom-drawer-item>
          </custom-selector>
        </flex-column>

        <span slot="top-app-bar-title">custom-elements</span>

        <flex-row slot="top-app-bar-end">
          <custom-theme-mode></custom-theme-mode>
          <custom-button>
            <custom-icon slot="icon">more_vert</custom-icon>
          </custom-button>
        </flex-row>

        <flex-column>
          <custom-pages attr-for-selected="route" default-selected="banner">
            <demo-section route="banner">
              <custom-banner>Banner</custom-banner>
            </demo-section>

            <demo-section route="divider">
              <custom-divider></custom-divider>
              <custom-divider inset></custom-divider>
              <custom-divider middle-inset></custom-divider>
            </demo-section>

            <demo-section route="cards">
              <custom-card type="filled">
                <span slot="headline">filled</span>
                <span slot="subline">subline</span>
                <p slot="supportingText">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ratione eligendi eum aliquam enim,
                  magni beatae facere tempora ex accusantium a, dolorem tempore placeat laboriosam praesentium veritatis
                  facilis et quasi? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ratione eligendi
                  eum aliquam enim, magni beatae facere tempora ex accusantium a, dolorem tempore placeat laboriosam
                  praesentium veritatis facilis et quasi?
                </p>
                <flex-row slot="actions">
                  <custom-button type="filled" label="YES"></custom-button>
                </flex-row>
              </custom-card>

              <custom-card type="elevated">
                <span slot="headline">elevated</span>
                <span slot="subline">subline</span>
                <p slot="supportingText">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ratione eligendi eum aliquam enim,
                  magni beatae facere tempora ex accusantium a, dolorem tempore placeat laboriosam praesentium veritatis
                  facilis et quasi?
                </p>
                <flex-row slot="actions">
                  <custom-button type="elevated" label="YES"></custom-button>
                </flex-row>
              </custom-card>

              <custom-card type="outlined">
                <span slot="headline">outlined</span>
                <span slot="subline">subline</span>
                <p slot="supportingText">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ratione eligendi eum aliquam enim,
                  magni beatae facere tempora ex accusantium a, dolorem tempore placeat laboriosam praesentium veritatis
                  facilis et quasi?
                </p>
                <flex-row slot="actions">
                  <custom-button type="outlined" label="YES"></custom-button>
                </flex-row>
              </custom-card>

              <custom-card type="tertiary">
                <img
                  loading="lazy"
                  slot="image"
                  src="https://lh3.googleusercontent.com/9NBw6U14z6f-EAnwPqfcX-mIkxNdpK0IXvwiun9w84JkMcZfBT0bfRqn7QWdBVqnCYC5hsDEnGhSjbaWcgi1HT_Q6pCioSRTgMFODqZdAXw=s0"
                />
                <span slot="headline">tertiary</span>
                <span slot="subline">subline</span>

                <flex-row slot="actions">
                  <custom-button type="tertiary" label="YES"></custom-button>
                </flex-row>
              </custom-card>
            </demo-section>

            <demo-section route="buttons">
              <custom-button type="text" label="text"></custom-button>

              <custom-button type="text" label="with icon">
                <span slot="icon">+</span>
              </custom-button>

              <custom-button type="filled" label="filled"></custom-button>

              <custom-button type="filled" label="with icon">
                <span slot="icon">+</span>
              </custom-button>

              <custom-button type="elevated" label="elevated"></custom-button>

              <custom-button type="elevated" label="with icon">
                <span slot="icon">+</span>
              </custom-button>

              <custom-button type="outlined" label="outlined"></custom-button>

              <custom-button type="outlined" label="with icon">
                <span slot="icon">+</span>
              </custom-button>

              <custom-button type="tonal" label="tonal"></custom-button>

              <custom-button type="tonal" label="with icon">
                <span slot="icon">+</span>
              </custom-button>

              <custom-button type="tertiary" label="tertiary"></custom-button>

              <custom-button type="tertiary" label="with icon">
                <span slot="icon">+</span>
              </custom-button>
            </demo-section>

            <demo-section route="top-app-bar">
              <custom-top-app-bar>
                <span slot="title">title</span>
              </custom-top-app-bar>

              <custom-top-app-bar type="small">
                <custom-icon-button slot="start" icon="menu"></custom-icon-button>
                <span slot="title">title</span>
              </custom-top-app-bar>

              <custom-top-app-bar type="medium">
                <custom-icon-button slot="start" icon="menu"></custom-icon-button>
                <span slot="title">title</span>
              </custom-top-app-bar>

              <custom-top-app-bar type="large">
                <custom-icon-button slot="start" icon="menu"></custom-icon-button>
                <span slot="title">title</span>
              </custom-top-app-bar>
            </demo-section>

            <demo-section route="typography">
              <custom-typography>
                <span>title</span>
              </custom-typography>

              <custom-typography size="medium">
                <span>title medium</span>
              </custom-typography>

              <custom-typography size="small">
                <span>title small</span>
              </custom-typography>

              <custom-typography type="body">
                <span>body</span>
              </custom-typography>

              <custom-typography type="body" size="medium">
                <span>body medium</span>
              </custom-typography>

              <custom-typography type="body" size="small">
                <span>body small</span>
              </custom-typography>

              <custom-typography type="label">
                <span>label</span>
              </custom-typography>

              <custom-typography type="label" size="medium">
                <span>label medium</span>
              </custom-typography>

              <custom-typography type="label" size="small">
                <span>label small</span>
              </custom-typography>

              <custom-typography type="headline">
                <span>headline</span>
              </custom-typography>

              <custom-typography type="headline" size="medium">
                <span>headline medium</span>
              </custom-typography>

              <custom-typography type="headline" size="small">
                <span>headline small</span>
              </custom-typography>

              <custom-typography type="display">
                <span>display</span>
              </custom-typography>

              <custom-typography type="display" size="medium">
                <span>display medium</span>
              </custom-typography>

              <custom-typography type="display" size="small">
                <span>display small</span>
              </custom-typography>
            </demo-section>

            <demo-section route="drawer">
              <custom-drawer open type="modal" id="demo-drawer">
                <span slot="content">
                  <custom-drawer-item>home</custom-drawer-item>
                  <custom-drawer-item>about</custom-drawer-item>
                </span>
              </custom-drawer>

              <custom-drawer-button id="demo-drawer"></custom-drawer-button>

              <custom-selector>
                <custom-drawer-item id="demo-drawer">drawer-item</custom-drawer-item>
              </custom-selector>
            </demo-section>

            <demo-section route="pane">
              <custom-pane open type="modal" id="demo-pane">
                <span slot="content">
                  <custom-drawer-item>home</custom-drawer-item>
                  <custom-drawer-item>about</custom-drawer-item>
                </span>
              </custom-pane>

              <custom-pane open type="modal" id="demo-pane" right>
                <span slot="content">
                  <custom-drawer-item>home</custom-drawer-item>
                  <custom-drawer-item>about</custom-drawer-item>
                </span>
              </custom-pane>
            </demo-section>

            <demo-section route="tabs">
              <custom-tabs>
                <custom-tab>home</custom-tab>
                <custom-tab>about</custom-tab>
              </custom-tabs>
            </demo-section>

            <demo-section route="dialog">
              <flex-container>
                <custom-button class="fullscreen-dialog"><custom-icon slot="icon">menu</custom-icon></custom-button>
                <custom-dialog fullscreen>
                  <span slot="title">title</span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quae ipsum autem, recusandae impedit
                    minus cumque odit vel incidunt, exercitationem sint tempore sit ea ratione accusamus nemo magni
                    dolorem corporis.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quae ipsum autem, recusandae impedit
                    minus cumque odit vel incidunt, exercitationem sint tempore sit ea ratione accusamus nemo magni
                    dolorem corporis.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quae ipsum autem, recusandae impedit
                    minus cumque odit vel incidunt, exercitationem sint tempore sit ea ratione accusamus nemo magni
                    dolorem corporis.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quae ipsum autem, recusandae impedit
                    minus cumque odit vel incidunt, exercitationem sint tempore sit ea ratione accusamus nemo magni
                    dolorem corporis.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quae ipsum autem, recusandae impedit
                    minus cumque odit vel incidunt, exercitationem sint tempore sit ea ratione accusamus nemo magni
                    dolorem corporis.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quae ipsum autem, recusandae impedit
                    minus cumque odit vel incidunt, exercitationem sint tempore sit ea ratione accusamus nemo magni
                    dolorem corporis.
                  </p>
                  <flex-row slot="actions">
                    <custom-button label="agree" action="agree">agree</custom-button>
                  </flex-row>
                </custom-dialog>

                <script>
                  const demoSection = document.querySelector('demo-section[route="dialog"]')
                  const fullscreenDialog = demoSection.querySelector('custom-dialog[fullscreen]')
                  demoSection.querySelector('.fullscreen-dialog').addEventListener('click', () => {
                    fullscreenDialog.open = !fullscreenDialog.open
                  })
                </script>
              </flex-container>

              <flex-container>
                <custom-button class="dialog"><custom-icon slot="icon">menu</custom-icon></custom-button>
                <custom-dialog class="dialog">
                  <span slot="title">title</span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quae ipsum autem, recusandae impedit
                    minus cumque odit vel incidunt, exercitationem sint tempore sit ea ratione accusamus nemo magni
                    dolorem corporis.
                  </p>

                  <flex-row slot="actions">
                    <custom-button label="agree" action="agree">agree</custom-button>
                  </flex-row>
                </custom-dialog>

                <script>
                  const dialog = demoSection.querySelector('custom-dialog.dialog')
                  demoSection.querySelector('.dialog').addEventListener('click', () => {
                    dialog.open = !dialog.open
                  })
                </script>
              </flex-container>
            </demo-section>

            <demo-section route="menu">
              <custom-menu>
                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 1
                </custom-list-item>

                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 2
                </custom-list-item>

                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 3
                </custom-list-item>
              </custom-menu>
            </demo-section>

            <demo-section route="dropdown-menu">
              <custom-dropdown-menu>
                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 1
                </custom-list-item>

                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 2
                </custom-list-item>

                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 3
                </custom-list-item>
              </custom-dropdown-menu>

              <flex-row>
                <flex-it></flex-it>
                <custom-dropdown-menu right>
                  <custom-list-item type="menu">
                    <custom-icon slot="start">info</custom-icon>
                    item 1
                  </custom-list-item>

                  <custom-list-item type="menu">
                    <custom-icon slot="start">info</custom-icon>
                    item 2
                  </custom-list-item>

                  <custom-list-item type="menu">
                    <custom-icon slot="start">info</custom-icon>
                    item 3
                  </custom-list-item>
                </custom-dropdown-menu>
              </flex-row>

              <custom-dropdown-menu bottom>
                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 1
                </custom-list-item>

                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 2
                </custom-list-item>

                <custom-list-item type="menu">
                  <custom-icon slot="start">info</custom-icon>
                  item 3
                </custom-list-item>
              </custom-dropdown-menu>

              <flex-row>
                <flex-it></flex-it>
                <custom-dropdown-menu bottom right>
                  <custom-list-item type="menu">
                    <custom-icon slot="start">info</custom-icon>
                    item 1
                  </custom-list-item>

                  <custom-list-item type="menu">
                    <custom-icon slot="start">info</custom-icon>
                    item 2
                  </custom-list-item>

                  <custom-list-item type="menu">
                    <custom-icon slot="start">info</custom-icon>
                    item 3
                  </custom-list-item>
                </custom-dropdown-menu>
              </flex-row>
            </demo-section>

            <demo-section route="list-item">
              <custom-list-item>
                <custom-icon slot="start">info</custom-icon>
              </custom-list-item>
            </demo-section>
            <demo-section route="toggle">
              <custom-toggle>
                <custom-icon>check_box</custom-icon>
                <custom-icon>check_box_outline_blank</custom-icon>
                <custom-icon>info</custom-icon>
              </custom-toggle>
            </demo-section>

            <demo-section route="toggle-button">
              <custom-toggle-button>
                <custom-icon>check_box</custom-icon>
                <custom-icon>check_box_outline_blank</custom-icon>
              </custom-toggle-button>
            </demo-section>
          </custom-pages>
        </flex-column>
      </custom-drawer-layout>
    `
  }
}
