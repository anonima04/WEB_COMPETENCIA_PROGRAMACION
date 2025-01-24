import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getSalas = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM sala");
  res.json(result.recordset);
};

export const getSala = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM sala WHERE pk_id_sala = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createSala = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("cap_asientos", sql.Int, req.body.cap_asientos)
    .input("estado_sala", sql.NChar, req.body.estado_sala)
    .input("nombre_sala", sql.NChar, req.body.nombre_sala)
    .query(
      `INSERT INTO sala
        (cap_asientos, estado_sala, nombre_sala)
        VALUES 
        (@cap_asientos, @estado_sala, @nombre_sala);
        SELECT SCOPE_IDENTITY() AS pk_id_sala;`
    );
  console.log(result);
  res.json({
    cap_asientos: req.body.cap_asientos,
    estado_sala: req.body.estado_sala,
    nombre_sala: req.body.nombre_sala
  });
};

export const updateSala = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("cap_asientos", sql.Int, req.body.cap_asientos)
  .input("estado_sala", sql.NChar, req.body.estado_sala)
  .input("nombre_sala", sql.NChar, req.body.nombre_sala)
  .query('UPDATE sala SET cap_asientos = @cap_asientos, estado_sala= @estado_sala, nombre_sala = @nombre_sala WHERE pk_id_sala = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    cap_asientos: req.body.cap_asientos,
    estado_sala: req.body.estado_sala,
    nombre_sala: req.nombre_sala
  })
};

export const deleteSala = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM sala WHERE pk_id_sala = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
