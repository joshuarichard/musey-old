const pg = require('pg')
const promise = require('bluebird')

let postgres = {

  connect: function() {

    promise.promisifyAll(pg.Client.prototype)

    var client = new pg.Client()

    return client.connect({
      user: 'postgres', //env var: PGUSER
      database: 'postgres', //env var: PGDATABASE
      password: 'joshrules', //env var: PGPASSWORD
      host: 'localhost', // Server hosting the postgres database
      port: 5432, //env var: PGPORT
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    })
  },

  query: function(query, args) {
    return client.query(query, args)
  },

  end: function() {
    return client.end()
  }

}

export default postgres
