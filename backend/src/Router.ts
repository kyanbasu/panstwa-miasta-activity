import type { RouterTypes } from "bun";
const routesMap: Map<string, RouterTypes.RouteValue<string>> = new Map();

export default class Router {
  static get(route: string, call: RouterTypes.RouteValue<string>) {
    routesMap.set(route, call);
  }

  static getRoutes() {
    return Object.fromEntries(routesMap);
  }
}
