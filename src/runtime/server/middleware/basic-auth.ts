import { useRuntimeConfig } from "#imports";
import { defineEventHandler } from "h3";
import type { ModuleRuntimeConfig } from "../../../module";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig().basicAuth as ModuleRuntimeConfig;

  /**
   * If the request is a prerender request, do nothing.
   */
  if (
    event.node.req.headers?.["x-nitro-prerender"] &&
    import.meta.env.NODE_ENV === "prerender"
  ) {
    return;
  }

  /**
   * If the module is not enabled, or no users are defined, or the current route is allowed, do nothing.
   */
  if (
    !config.enabled ||
    (typeof config.enabled === "string" && config.enabled !== "true") ||
    !config.users?.length ||
    config.allowedRoutes?.some((route) => {
      const regex = new RegExp(route);

      return regex.test(event.node.req?.url || "");
    })
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
      .toString("utf8")
      .split(":");

    const users = Array.isArray(config.users)
      ? config.users
      : config.users.split(config.usersDelimiter ?? ",").map((user) => {
          const [username, password] = user.split(":");
          return { username, password };
        });

    authenticated = users.some(
      (user) => user.username === username && user.password === password
    );
  }

  /**
   * If the user is not authenticated or the credentials are not defined, send a 401 response.
   */
  if (!authenticated) {
    event.node.res.setHeader(
      "WWW-Authenticate",
      'Basic realm="Secure Area", charset="UTF-8"'
    );
    event.node.res.statusCode = 401;
    event.node.res.end("Access denied");
  }
});
