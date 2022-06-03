const { Pool } = require("pg")
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "espinoza",
    port: 5432,
    database: "bancosolar",
})

module.exports = { pool }