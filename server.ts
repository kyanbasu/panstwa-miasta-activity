import config from "./backend/src/config";

import { serve } from "bun";
import Router from "./backend/src/Router";
import index from "./frontend/index.html";

Router.get("/*", index);

serve({
  port: config.serverPort,
  routes: Router.getRoutes(),
});

console.log(`Server running at http://localhost:${config.serverPort}`);
