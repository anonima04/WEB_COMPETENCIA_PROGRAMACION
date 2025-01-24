import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getTipoDocumentos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM tipo_documento");
  res.json(result.recordset);
};

export const getTipoDocumento = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM tipo_documento WHERE pk_id_documento = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createTipoDocumento = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("tipo_documento", sql.NChar, req.body.tipo_documento)
    .query(
      `INSERT INTO tipo_documento
        (tipo_documento)
        VALUES 
        (@tipo_documento);
        SELECT SCOPE_IDENTITY() AS pk_id_documento;`
    );
  console.log(result);
  res.json({
    tipo_documento: req.body.tipo_documento
  });
};

export const updateTipoDocumento = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("tipo_documento", sql.NChar, req.body.tipo_documento)
  .query('UPDATE tipo_documento SET tipo_documento = @tipo_documento WHERE pk_id_documento = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    tipo_documento: req.body.tipo_documento
  })
};

export const deleteTipoDocumento = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM tipo_documento WHERE pk_id_documento = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
