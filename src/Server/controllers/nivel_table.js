import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getNiveles = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM nivel");
  res.json(result.recordset);
};

export const getNivel = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM nivel WHERE pk_id_nivel = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createNivel = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("fk_id_evento", sql.Int, req.body.fk_id_evento)
    .input("nombre_nivel", sql.VarChar, req.body.nombre_nivel)
    .query(
      `INSERT INTO nivel
        (nombre_nivel, fk_id_evento)
        VALUES 
        (@nombre_nivel, @fk_id_evento);
        SELECT SCOPE_IDENTITY() AS pk_id_nivel;`
    );
  console.log(result);
  res.json({
    nombre_nivel: req.body.nombre_nivel,
    fk_id_evento: req.body.fk_id_evento,
  });
};

export const updateNivel = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("fk_id_evento", sql.Int, req.body.fk_id_evento)
    .input("nombre_nivel", sql.VarChar, req.body.nombre_nivel)
  .query('UPDATE nivel SET nombre_nivel = @nombre_nivel, fk_id_evento= @fk_id_evento WHERE pk_id_nivel = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    nombre_nivel: req.body.nombre_nivel,
    fk_id_evento: req.body.fk_id_evento
  })
};

export const deleteNivel = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM nivel WHERE pk_id_nivel = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
