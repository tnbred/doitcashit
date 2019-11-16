var env = process.env;

module.exports = {
  port: env.PORT ? parseInt(env.PORT, 10) : 1337,
   PG: {
    PG_URL: env.PG_URL ? env.PG_URL : "postgres://username:pwd@url:port/databasename?ssl=true"
  }
};
