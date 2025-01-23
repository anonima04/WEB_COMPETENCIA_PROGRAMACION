import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getEjercicios = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM ejercicios");
  res.json(result.recordset);
};

export const getEjercicio = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM ejercicios WHERE pk_id_ejercicio = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createEjercicio= async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("nombre_ejercicio", sql.NChar, req.body.nombre_ejercicio)
    .input("fk_id_nivel_evento", sql.Int, req.body.fk_id_nivel_evento)
    .input("fk_id_nivel", sql.Int, req.body.fk_id_nivel)
    .query(
      `INSERT INTO ejercicios
        (nombre_ejercicio, fk_id_nivel_evento, fk_id_nivel)
        VALUES 
        (@nombre_ejercicio, @fk_id_nivel_evento, @fk_id_nivel);
        SELECT SCOPE_IDENTITY() AS pk_id_ejercicio;`
    );
  console.log(result);
  res.json({
    pk_id_ejercicio: req.body.pk_id_ejercicio,
    fk_id_nivel: req.body.fk_id_nivel,
    fk_id_nivel_evento: req.body.fk_id_nivel_evento
  });
};

export const updateEjercicio = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("nombre_ejercicio", sql.NChar, req.body.nombre_ejercicio)
  .input("fk_id_nivel_evento", sql.Int, req.body.fk_id_nivel_evento)
  .input("fk_id_nivel", sql.Int, req.body.fk_id_nivel)
  .query('UPDATE ejercicios SET nombre_ejercicio = @nombre_ejercicio, fk_id_nivel_evento= @fk_id_nivel_evento, fk_id_nivel= @fk_id_nivel WHERE pk_id_ejercicio = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    nombre_ejercicio: req.body.nombre_ejercicio,
    fk_id_nivel: req.body.fk_id_nivel,
    fk_id_nivel_evento: req.body.fk_id_nivel_evento
  })
};

export const deleteEjercicio= async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM ejercicios WHERE pk_id_ejercicio = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
