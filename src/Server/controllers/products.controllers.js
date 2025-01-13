import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM persona");
  res.json(result.recordset);
};

export const getProduct = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM persona WHERE pk_id_persona = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createProduct = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()

    .input("prim_nombre", sql.NChar, req.body.prim_nombre)
    .input("seg_nombre", sql.NChar, req.body.seg_nombre)
    .input("prim_apellido", sql.NChar, req.body.prim_apellido)
    .input("seg_apellido", sql.NChar, req.body.seg_apellido)
    .input("fk_id_documento", sql.Int, req.body.fk_id_documento)
    .input("numero_documento", sql.NChar, req.body.numero_documento)
    .query(
      `INSERT INTO persona 
        (prim_nombre, seg_nombre, prim_apellido, seg_apellido, fk_id_documento, numero_documento)
        VALUES 
        (@prim_nombre, @seg_nombre, @prim_apellido, @seg_apellido, @fk_id_documento, @numero_documento);
        SELECT SCOPE_IDENTITY() AS pk_id_persona;`
    );
  console.log(result);
  res.json({
    prim_nombre: req.body.prim_nombre,
    seg_nombre: req.body.seg_nombre,
  });
};

export const updateProduct = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
    .input("id", sql.Int, req.params.id)
    .input("prim_nombre", sql.NChar, req.body.prim_nombre)
    .input("seg_nombre", sql.NChar, req.body.seg_nombre)
    .input("prim_apellido", sql.NChar, req.body.prim_apellido)
    .input("seg_apellido", sql.NChar, req.body.seg_apellido)
    .input("fk_id_documento", sql.Int, req.body.fk_id_documento)
    .input("numero_documento", sql.NChar, req.body.numero_documento)
  .query('UPDATE persona SET prim_nombre = @prim_nombre, seg_nombre= @seg_nombre, prim_apellido = @prim_apellido, seg_apellido= @seg_apellido, fk_id_documento= @fk_id_documento, numero_documento= @numero_documento WHERE pk_id_persona = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    prim_nombre: req.params.prim_nombre,
    seg_nombre: req.body.message,
    prim_apellido: req.body.prim_apellido,
    seg_apellido: req.body.seg_apellido,
    fk_id_documento: req.body.fk_id_documento,
    numero_documento: req.body.numero_documento,
  })
};

export const deleteProduct = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM persona WHERE pk_id_persona = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
