import { HashRouterConstructorOptions, RouteAble, RoutesOption } from './types.js'

export default class HashRouter {
  host: RouteAble
  routes: RoutesOption

  constructor({ host, fallback, routes }: HashRouterConstructorOptions) {
    this.host = host
    this.routes = routes

    globalThis.onhashchange = this.#onhashchange

    if (!location.hash && fallback?.route) {
      location.hash = HashRouter.bang(
        fallback.params ? `${fallback.route}?${HashRouter.queryIt(fallback.params)}` : fallback.route
      )
    } else this.#onhashchange()
  }

  static queryIt(params) {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  }

  static dequeryIt(query) {
    const params = {}
    if (!query) return params
    for (const item of query.split('&')) {
      const [key, value] = item.split('=')
      params[key] = value
    }
    return
  }

  static bang(route: string) {
    return `#!/${route}`
  }

  static debang(route: string) {
    return route.split('#!/')[1]
  }

  static parseHash(hash) {
    const afterBang = HashRouter.debang(hash)
    const splitted = afterBang.split('?')
    const routes = splitted[0].split('/')
    const route = routes[0]
    const subRoutes = routes.slice(1, -1)
    const params = HashRouter.dequeryIt(splitted[1])

    return { route, routes, subRoutes, params, url: splitted[0] }
  }

  #handleSubRoutes = async (routing, routeInfo) => {
    const { params, subRoutes } = routing

    let selected = this.host.pages.querySelector('.custom-selected') as RouteAble

    if (routing.subRoutes?.length > 0) {
      for (const route of routing.subRoutes) {
        const subRouteInfo = routeInfo.subRoutes[route]
        if (subRouteInfo) {
          if (!customElements.get(`./${subRouteInfo.tagName}`)) await import(`./${subRouteInfo.import}.js`)
        } else {
          if (!customElements.get(`./${route}`)) await import(`./${route}.js`)
          console.warn(`handling undefined subroute for ${routing.route} falling back to default behavior.`)
        }
        selected.select({ route, params, subRoutes })
        selected = selected.pages.querySelector('.custom-selected')
      }
    }

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        selected[key] = value
      }
    }
  }

  #onhashchange = async () => {
    const routing = HashRouter.parseHash(location.hash)
    const routeInfo = this.routes[routing.url]
    // todo allow to set loading
    if (routeInfo) {
      if (!customElements.get(`./${routeInfo.tagName}`)) await import(`./${routeInfo.import}.js`)
    } else {
      if (!customElements.get(`./${routing.route}`)) await import(`./${routing.route}.js`)
    }
    this.host.select(routing)
    // when a custom-pages element (or sortlike) is defined loop trough subroutes and make devlife easier
    if (this.host.pages) {
      this.#handleSubRoutes(routing, routeInfo)
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
