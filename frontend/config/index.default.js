var env = process.env;

module.exports = {
  port: env.PORT ? parseInt(env.PORT, 10) : 1337,
  Cookie: {
    Secret: env.COOKIE_SECRET ? env.COOKIE_SECRET : ""
  },
  Session: {
    Secret: env.SESSION_SECRET ? env.SESSION_SECRET : ""
  }
};
