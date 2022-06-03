const { pool } = require("./config");

const eliminarUsuario = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM transferencias WHERE emisor = ${id} OR receptor = ${id};
            DELETE FROM usuarios WHERE id = '${id}'`);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}
module.exports = { eliminarUsuario }