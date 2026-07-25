import {
  HashRouterConstructorOptions,
  RouteAble,
  RouteInfo,
  RouteParams,
  RouteSelection,
  RoutesOption
} from './types.js'

export default class HashRouter {
  host: RouteAble
  routes: RoutesOption

  constructor({ host, fallback, routes }: HashRouterConstructorOptions) {
    this.host = host
    this.routes = routes

    globalThis.addEventListener('hashchange', this.#onHashChange)

    if (!location.hash && fallback?.route) {
      location.hash = HashRouter.bang(
        fallback.params ? `${fallback.route}?${HashRouter.queryIt(fallback.params)}` : fallback.route
      )
    } else void this.#onHashChange()
  }

  destroy(): void {
    globalThis.removeEventListener('hashchange', this.#onHashChange)
  }

  static queryIt(params: RouteParams): string {
    return new URLSearchParams(params).toString()
  }

  static dequeryIt(query = ''): RouteParams {
    return Object.fromEntries(new URLSearchParams(query))
  }

  static bang(route: string) {
    return `#!/${route}`
  }

  static debang(route: string): string {
    return route.startsWith('#!/') ? route.slice(3) : route.replace(/^#/, '')
  }

  static parseHash(hash: string): RouteSelection {
    const afterBang = HashRouter.debang(hash)
    const [url = '', query = ''] = afterBang.split('?')
    const routes = url.split('/').filter(Boolean)
    const route = routes[0]
    const subRoutes = routes.slice(1)
    const params = HashRouter.dequeryIt(query)

    return { route, routes, subRoutes, params, url }
  }

  static async #loadRoute(route: string, routeInfo?: RouteInfo): Promise<void> {
    const tagName = routeInfo?.tagName ?? route
    const importPath = routeInfo?.import ?? route
    if (!tagName || customElements.get(tagName)) return
    await import(`./${importPath}.js`)
  }

  #handleSubRoutes = async (routing: RouteSelection, routeInfo?: RouteInfo): Promise<void> => {
    const { params, subRoutes } = routing

    let selected = (this.host.pages?.querySelector('.custom-selected') as RouteAble | null) ?? null
    if (!selected) return

    for (const route of subRoutes) {
      const subRouteInfo = routeInfo?.subRoutes?.[route]
      if (!subRouteInfo) {
        console.warn(`Undefined subroute "${route}" for "${routing.route}"; using the conventional module path.`)
      }
      await HashRouter.#loadRoute(route, subRouteInfo)
      selected.select({ route, params, subRoutes })
      selected = (selected.pages?.querySelector('.custom-selected') as RouteAble | null) ?? null
      if (!selected) break
    }

    if (selected) {
      for (const [key, value] of Object.entries(params)) {
        selected[key] = value
      }
    }
  }

  #onHashChange = async (): Promise<void> => {
    const routing = HashRouter.parseHash(location.hash)
    if (!routing.route) return

    const routeInfo = this.routes[routing.url] ?? this.routes[routing.route]

    try {
      await HashRouter.#loadRoute(routing.route, routeInfo)
      this.host.select(routing)

      if (this.host.pages) {
        await this.#handleSubRoutes(routing, routeInfo)
      }
    } catch (error) {
      document.dispatchEvent(
        new CustomEvent('route-error', {
          detail: { error, routing, routeInfo }
        })
      )
      return
    }

    document.dispatchEvent(
      new CustomEvent('route-change', {
        detail: {
          routing,
          routeInfo
        }
      })
    )
  }
}
