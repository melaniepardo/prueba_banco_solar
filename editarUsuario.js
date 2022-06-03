const { pool } = require("./config");

const editarUsuario = async (datos, id) => {
    const consulta = {
        text: `UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = '${id}' RETURNING *`,
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports = { editarUsuario };