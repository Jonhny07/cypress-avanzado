const { defineConfig } = require("cypress");
// const sqlServer = require('cypress-sql-server'); // sql server
const { Client } = require('pg')

module.exports = defineConfig({
  projectId: 'smxft1',
  e2e: {
    setupNodeEvents(on, config) {
      // tasks = sqlServer.loadDBPlugin(config.db);
      // on('task', tasks); SQL SERVER
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: "avanzado1",
            password: "K2VE0V1Zbm2U0556VZ2fWKyAMgtMutTI",
            host: "dpg-cnl4j7acn0vc73fifpig-a.oregon-postgres.render.com",
            database: "avanzado1",
            ssl: true,
            port: 5432
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
    },
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 1000,
    fixturesFolder: "cypress/e2e/",
    retries: 3,
    requestTimeout: 30000,
  },
  env: {
    usuario: "pushingit",
    password: "123456!",
    baseUrlAPI: "https://pushing-it.onrender.com/api",
    token: "",
  },
  // "db":{
  //   "userName":"avanzado1",
  //   "password":"RdnzbdiBUT4iuKyNTwEIp7JCMqrtdKnR",
  //   "server":"dpg-cnrmouf79t8c73d8mnng-a.oregon-postgres.render.com",
  //   "options":{
  //     "database":"avanzado1_fzw9",
  //     "encrypt":true,
  //     "rowCollectionOnRequestCompletion":true
  //   }
  // }
});
