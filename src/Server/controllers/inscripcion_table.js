import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getInscripciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM inscripcion");
  res.json(result.recordset);
};

export const getInscripcion = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM inscripcion WHERE pk_id_inscripcion = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createInscripcion = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("fk_id_evento", sql.Int, req.body.fk_id_evento)
    .input("fk_id_nivel", sql.Int, req.body.fk_id_nivel)
    .input("fk_id_equipo", sql.Int, req.body.fk_id_equipo)
    .input("fecha_inscripcion", sql.DateTime, req.body.fecha_inscripcion)
    .query(
      `INSERT INTO inscripcion
        (fk_id_nivel, fk_id_evento, fk_id_equipo, fecha_inscripcion)
        VALUES 
        (@fk_id_nivel, @fk_id_evento, @fk_id_equipo, @fecha_inscripcion);
        SELECT SCOPE_IDENTITY() AS pk_id_inscripcion;`
    );
  console.log(result);
  res.json({
    fk_id_equipo: req.body.fk_id_equipo,
    fk_id_nivel: req.body.fk_id_nivel,
    fk_id_evento: req.body.fk_id_evento,
    fecha_inscripcion: req.body.fecha_inscripcion
  });
};

export const updateInscripcion = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("fk_id_evento", sql.Int, req.body.fk_id_evento)
    .input("fk_id_nivel", sql.Int, req.body.fk_id_nivel)
    .input("fk_id_equipo", sql.Int, req.body.fk_id_equipo)
    .input("fecha_inscripcion", sql.DateTime, req.body.fecha_inscripcion)
  .query('UPDATE inscripcion SET fk_id_evento = @fk_id_evento, fk_id_nivel= @fk_id_nivel, fk_id_equipo= @fk_id_equipo, fecha_inscripcion=@fecha_inscripcion WHERE pk_id_inscripcion = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    fk_id_equipo: req.body.fk_id_equipo,
    fk_id_nivel: req.body.fk_id_nivel,
    fk_id_evento: req.body.fk_id_evento,
    fecha_inscripcion: req.fecha_inscripcion
  })
};

export const deleteInscripcion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM inscripcion WHERE pk_id_inscripcion = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
