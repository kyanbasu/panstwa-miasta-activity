import type { Config } from "./types";
import rawConfig from "../../config.json" assert { type: "json" };

const config = rawConfig as unknown as Config;

if (!config.serverPort) missingConfigVarExit("serverPort");

export default config;

function missingConfigVarExit(missingVar: string, required: boolean = true) {
  console.error(`Missing config variable: ${missingVar}`);
  if (required) process.exit(1);
}
