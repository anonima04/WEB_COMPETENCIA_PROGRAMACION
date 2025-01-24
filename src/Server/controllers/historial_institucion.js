import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getHistorial_instituciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM historial_institucion");
  res.json(result.recordset);
};

export const getHistorial_institucion = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM historial_institucion WHERE pk_id_historial_institucion = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createHistorial_institucion = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("fk_id_institucion", sql.Int, req.body.fk_id_institucion)
    .input("fk_id_persona", sql.Int, req.body.fk_id_persona)
    .input("fecha_inicio", sql.DateTime, req.body.fecha_inicio)
    .input("fecha_fin", sql.DateTime, req.body.fecha_fin)
    .query(
      `INSERT INTO historial_institucion
        (fk_id_institucion, fk_id_persona, fecha_inicio, fecha_fin)
        VALUES 
        (@fk_id_institucion, @fk_id_persona, @fecha_inicio, @fecha_fin);
        SELECT SCOPE_IDENTITY() AS pk_id_historial_institucion;`
    );
  console.log(result);
  res.json({
    fk_id_persona: req.body.fk_id_persona,
    fk_id_institucion: req.body.fk_id_institucion,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin
  });
};

export const updateHistorial_institucion = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("fk_id_institucion", sql.Int, req.body.fk_id_institucion)
  .input("fk_id_persona", sql.Int, req.body.fk_id_persona)
  .input("fecha_inicio", sql.DateTime, req.body.fecha_inicio)
  .input("fecha_fin", sql.DateTime, req.body.fecha_fin)
  .query('UPDATE historial_institucion SET fk_id_persona = @fk_id_persona, fk_id_institucion= @fk_id_institucion, fecha_inicio= @fecha_inicio, fecha_fin= @fecha_fin WHERE pk_id_historial_institucion= @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    fk_id_persona: req.body.fk_id_persona,
    fk_id_institucion: req.body.fk_id_institucion,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin
  })
};

export const deleteHistorial_institucion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM historial_institucion WHERE pk_id_historial_institucion = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
