import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getAsistenciaEquipos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM asistencia_equipo");
  res.json(result.recordset);
};

export const getAsistenciaEquipo = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM asistencia_equipo WHERE pk_id_asistencia_equipo = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createAsistenciaEquipo = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("asistencia", sql.NChar, req.body.asistencia)
    .input("puesto_final", sql.Int, req.body.puesto_final)
    .input("fk_id_equipo", sql.Int, req.body.fk_id_equipo)
    .query(
      `INSERT INTO asistencia_equipo
        (asistencia, puesto_final, fk_id_equipo)
        VALUES 
        (@asistencia, @puesto_final, @fk_id_equipo);
        SELECT SCOPE_IDENTITY() AS pk_id_asistencia_equipo;`
    );
  console.log(result);
  res.json({
    asistencia: req.body.asistencia,
    puesto_final: req.body.puesto_final,
    fk_id_equipo: req.body.fk_id_equipo
  });
};

export const updateAsistenciaEquipo = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("asistencia", sql.NChar, req.body.asistencia)
  .input("puesto_final", sql.Int, req.body.puesto_final)
  .input("fk_id_equipo", sql.Int, req.body.fk_id_equipo)
  .query('UPDATE asistencia_equipo SET asistencia = @asistencia, puesto_final= @puesto_final, fk_id_equipo=@fk_id_equipo WHERE pk_id_asistencia_equipo = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    asistencia: req.body.asistencia,
    puesto_final: req.body.puesto_final,
    fk_id_equipo: req.body.fk_id_equipo
  })
};

export const deleteAsistenciaEquipo = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM asistencia_equipo WHERE pk_id_asistencia_equipo = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
