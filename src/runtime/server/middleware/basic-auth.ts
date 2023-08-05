import { useRuntimeConfig } from "#imports";
import { defineEventHandler } from "h3";
import type { ModuleRuntimeConfig } from "../../../module";
import { minimatch } from "minimatch";

export default defineEventHandler((event) => {
  console.log(process.env);
  const config = useRuntimeConfig().basicAuth as ModuleRuntimeConfig;

  /**
   * If the module is not enabled, or no users are defined, or the current route is allowed, do nothing.
   */
  if (
    !config.enabled ||
    !config.users?.length ||
    config.allowedRoutes?.some((route) =>
      minimatch(event.node.req.url || "", route)
    )
  ) {
    return;
  }

  let authenticated = false;

  /**
   * Get the credentials from the Authorization header.
   */
  const credentials = event.node.req.headers?.authorization?.split(" ")[1];

  /**
   * If the credentials are defined, check if they match any of the users.
   */
  if (credentials) {
    const [username, password] = Buffer.from(credentials, "base64")
      .toString("ascii")
      .split(":");

    authenticated = config.users.some(
      (user) => user.username === username && user.password === password
    );
  }

  /**
   * If the user is not authenticated or the credentials are not defined, send a 401 response.
   */
  if (!authenticated) {
    event.node.res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    event.node.res.statusCode = 401;
    event.node.res.end("Access denied");
  }
});
