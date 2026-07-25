export type RouteParams = Record<string, string>

export interface RouteSelection {
  route: string
  routes: string[]
  subRoutes: string[]
  params: RouteParams
  url: string
}

export interface RouteInfo {
  tagName?: string
  import?: string
  subRoutes?: Record<string, RouteInfo>
}

export type RoutesOption = Record<string, RouteInfo>

export interface RouteAble extends HTMLElement {
  pages?: ParentNode & { querySelector(selectors: string): RouteAble | null }
  select(value: string | RouteSelection | { route: string; params: RouteParams; subRoutes: string[] }): void
  [key: string]: unknown
}

export interface HashRouterConstructorOptions {
  host: RouteAble
  routes: RoutesOption
  fallback?: {
    route: string
    params?: RouteParams
  }
}
