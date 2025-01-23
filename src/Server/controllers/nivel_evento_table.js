import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getNivelesEvento = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM nivel_evento");
  res.json(result.recordset);
};

export const getNivelEvento = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM nivel_evento WHERE pk_id_nivel_evento = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createNivelEvento = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("cant_niveles", sql.Int, req.body.cant_niveles)
    .input("fecha_realizacion_evento", sql.Date, req.body.fecha_realizacion_evento)
    .input("fk_id_evento", sql.Int, req.body.fk_id_evento)
    .query(
      `INSERT INTO nivel_evento
        (cant_niveles, fecha_realizacion_evento, fk_id_evento)
        VALUES 
        (@cant_niveles, @fecha_realizacion_evento, @fk_id_evento);
        SELECT SCOPE_IDENTITY() AS pk_id_nivel_evento;`
    );
  console.log(result);
  res.json({
    cant_niveles: req.body.cant_niveles,
    fecha_realizacion_evento: req.body.fecha_realizacion_evento,
    fk_id_evento: req.body.fk_id_evento
  });
};

export const updateNivelEvento = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("cant_niveles", sql.Int, req.body.cant_niveles)
  .input("fecha_realizacion_evento", sql.Date, req.body.fecha_realizacion_evento)
  .input("fk_id_evento", sql.Int, req.body.fk_id_evento )
  .query('UPDATE nivel_evento SET cant_niveles = @cant_niveles, fecha_realizacion_evento= @fecha_realizacion_evento, fk_id_evento= @fk_id_evento WHERE pk_id_nivel_evento = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    cant_niveles: req.body.cant_niveles,
    fk_id_evento: req.body.fk_id_evento,
    fecha_realizacion_evento: req.body.fecha_realizacion_evento
  })
};

export const deleteNivelEvento = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM nivel_evento WHERE pk_id_nivel_evento = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
