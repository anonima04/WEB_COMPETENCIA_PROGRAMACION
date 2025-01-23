import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getUsuarios = async (req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM usuario");
  res.json(result.recordset);
};
export const getUsuario = async (req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM usuario  WHERE pk_id_usuario = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(result.recordset[0]);
};

export const createUsuario = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("correo_usuario", sql.NChar, req.body.correo_usuario)
    .input("rol_persona", sql.NChar, req.body.rol_persona)
    .input("fecha_registro", sql.DateTime, req.body.fecha_registro)
    .input("estado_usuario", sql.NChar, req.body.estado_usuario)
    .input("contrasena_usuario", sql.VarChar, req.body.contrasena_usuario)
    .input("fk_id_persona", sql.Int, req.body.fk_id_persona)
    .query(
      "INSERT INTO usuario (correo_usuario, rol_persona, fecha_registro, estado_usuario, contrasena_usuario, fk_id_persona) VALUES (@correo_usuario, @rol_persona, @fecha_registro, @estado_usuario, @contrasena_usuario, @fk_id_persona); SELECT SCOPE_IDENTITY() AS pk_id_usuario;"
    );
  console.log(result);
  res.json({
    correo_usuario: req.body.correo_usuario,
    rol_persona: req.body.rol_persona,
    fecha_registro: req.body.fecha_registro,
    contrasena_usuario: req.body.contrasena_usuario,
  });
};

export const updateUsuario = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .input("correo_usuario", sql.NChar, req.body.correo_usuario)
    .input("rol_persona", sql.NChar, req.body.rol_persona)
    .input("fecha_registro", sql.DateTime, req.body.fecha_registro)
    .input("estado_usuario", sql.NChar, req.body.estado_usuario)
    .input("contrasena_usuario", sql.VarChar, req.body.contrasena_usuario)
    .input("fk_id_persona", sql.Int, req.body.fk_id_persona)
    .query(
      'UPDATE usuario SET correo_usuario = @correo_usuario, rol_persona= @rol_persona, fecha_registro= @fecha_registro, estado_usuario= @estado_usuario, contrasena_usuario = @contrasena_usuario, fk_id_persona= @fk_id_persona WHERE pk_id_usuario = @id');
    if (result.rowsAffected[0]===0){
      return res.status(404).json({message: "Product not found"});
    }
    res.json({
      id: req.params.id,
      fk_id_persona: req.body.fk_id_persona,
      contrasena_usuario: req.body.contrasena_usuario,
      estado_usuario: req.body.estado_usuario,
      fecha_registro: req.body.fecha_registro,
      rol_persona: req.body.rol_persona,
      correo_usuario: req.body.correo_usuario
    })
};

export const deleteUsuario = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM usuario WHERE pk_id_usuario = @id");
  console.log(result);

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json({ message: "Product deleted" });
};
