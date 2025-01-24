import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getHistorialUsuarioEquipos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM historial_usuario_equipo");
  res.json(result.recordset);
};

export const getHistorialUsuarioEquipo = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM historial_usuario_equipo WHERE pk_id_historial_usuario_equipo = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createHistorialUsuarioEquipo = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("fk_id_usuario", sql.Int, req.body.fk_id_usuario)
    .input("fk_id_inscripcion", sql.Int, req.body.fk_id_inscripcion)
    .input("usuario", sql.NChar, req.body.usuario)
    .input("contrasena", sql.NChar, req.body.contrasena)
    .input("fecha_vinculacion", sql.DateTime, req.body.fecha_vinculacion)
    .input("asistencia", sql.NChar, req.body.asistencia)
    .query(
      `INSERT INTO historial_usuario_equipo
        (fk_id_usuario, fk_id_inscripcion, usuario, contrasena, fecha_vinculacion, asistencia)
        VALUES 
        (@fk_id_usuario, @fk_id_inscripcion, @usuario, @contrasena, @fecha_vinculacion, @asistencia);
        SELECT SCOPE_IDENTITY() AS pk_id_historial_usuario_equipo;`
    );
  console.log(result);
  res.json({
    fk_id_inscripcion: req.body.fk_id_inscripcion,
    fk_id_usuario: req.body.fk_id_usuario,
    usuario: req.body.usuario,
    contrasena: req.contrasena,
    fecha_vinculacion: req.fecha_vinculacion,
    asistencia: req.asistencia
  });
};

export const updateHistorialUsuarioEquipo = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("fk_id_usuario", sql.Int, req.body.fk_id_usuario)
    .input("fk_id_inscripcion", sql.Int, req.body.fk_id_inscripcion)
    .input("usuario", sql.NChar, req.body.usuario)
    .input("contrasena", sql.NChar, req.body.contrasena)
    .input("fecha_vinculacion", sql.DateTime, req.body.fecha_vinculacion)
    .input("asistencia", sql.NChar, req.body.asistencia)
  .query('UPDATE historial_usuario_equipo SET fk_id_usuario = @fk_id_usuario, fk_id_inscripcion= @fk_id_inscripcion, usuario=@usuario, contrasena = @contrasena, fecha_vinculacion = @fecha_vinculacion, asistencia = @asistencia WHERE pk_id_historial_usuario_equipo = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    fk_id_inscripcion: req.body.fk_id_inscripcion,
    fk_id_usuario: req.body.fk_id_usuario,
    usuario: req.body.usuario,
    contrasena: req.contrasena,
    fecha_vinculacion: req.fecha_vinculacion,
    asistencia: req.asistencia
  })
};

export const deleteHistorialUsuarioEquipo = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM historial_usuario_equipo WHERE pk_id_historial_usuario_equipo = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
