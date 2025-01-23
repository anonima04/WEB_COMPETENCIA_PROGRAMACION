import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getInstituciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM institucion");
  res.json(result.recordset);
};

export const getInstitucion = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM institucion WHERE pk_id_institucion = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createInstitucion = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("nombre_institucion", sql.NChar, req.body.nombre_institucion)
    .input("estado_institucion", sql.NChar, req.body.estado_institucion)
    .query(
      `INSERT INTO institucion 
        (nombre_institucion, estado_institucion)
        VALUES 
        (@nombre_institucion, @estado_institucion);
        SELECT SCOPE_IDENTITY() AS pk_id_institucion;`
    );
  console.log(result);
  res.json({
    nombre_institucion: req.body.nombre_institucion,
    estado_institucion: req.body.estado_institucion,
  });
};

export const updateInstitucion = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("nombre_institucion", sql.NChar, req.body.nombre_institucion)
  .input("estado_institucion", sql.NChar, req.body.estado_institucion)
  .query('UPDATE institucion SET nombre_institucion = @nombre_institucion, estado_institucion= @estado_institucion WHERE pk_id_institucion = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    nombre_institucion: req.body.nombre_institucion,
    estado_institucion: req.body.estado_institucion
  })
};

export const deleteInstitucion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM institucion WHERE pk_id_institucion = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
