const { pool } = require("./config");

const getTransferencias = async () => {
    const query = {
        text: "SELECT * FROM transferencias",
        rowMode: "array"
    }
    const result = await pool.query(query)
    return result.rows
}
module.exports = { getTransferencias };