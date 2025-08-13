import type { RouterTypes } from "bun";
const routes: { [route: string]: RouterTypes.RouteValue<string> } = {};

export default class Router {
  static get(route: string, call: RouterTypes.RouteValue<string>) {
    routes[route] = call;
  }

  static getRoutes() {
    return routes;
  }
}
