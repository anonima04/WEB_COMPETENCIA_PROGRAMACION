import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getEjerciciosResueltos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM ejercicios_resueltos");
  res.json(result.recordset);
};

export const getEjercicioResuelto = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM ejercicios_resueltos WHERE pk_id_ejercicios_resueltos = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createEjercicioResuelto= async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("fk_id_inscripcion", sql.Int, req.body.fk_id_inscripcion)
    .input("fk_id_ejercicios", sql.Int, req.body.fk_id_ejercicios)
    .input("tiempo_minutos", sql.Int, req.body.tiempo_minutos)
    .query(
      `INSERT INTO ejercicios_resueltos
        (fk_id_inscripcion, fk_id_ejercicios, tiempo_minutos)
        VALUES 
        (@fk_id_inscripcion, @fk_id_ejercicios, @tiempo_minutos);
        SELECT SCOPE_IDENTITY() AS pk_id_ejercicios_resueltos;`
    );
  console.log(result);
  res.json({
    fk_id_ejercicios: req.body.fk_id_ejercicios,
    fk_id_inscripcion: req.body.fk_id_inscripcion,
    tiempo_minutos: req.body.tiempo_minutos
  });
};

export const updateEjercicioResuelto = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("fk_id_inscripcion", sql.Int, req.body.fk_id_inscripcion)
  .input("fk_id_ejercicios", sql.Int, req.body.fk_id_ejercicios)
  .input("tiempo_minutos", sql.Int, req.body.tiempo_minutos)
  .query('UPDATE ejercicios_resueltos SET fk_id_inscripcion = @fk_id_inscripcion, fk_id_ejercicios= @fk_id_ejercicios, tiempo_minutos= @tiempo_minutos WHERE pk_id_ejercicios_resueltos = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    tiempo_minutos: req.body.tiempo_minutos,
    fk_id_inscripcion: req.body.fk_id_inscripcion,
    fk_id_ejercicios: req.body.fk_id_ejercicios
  })
};

export const deleteEjercicioResuelto= async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM ejercicios_resueltos WHERE pk_id_ejercicios_resueltos = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
