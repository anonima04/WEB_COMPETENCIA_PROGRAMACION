import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getColegios = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM colegio");
  res.json(result.recordset);
};

export const getColegio = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM colegio WHERE pk_id_colegio = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createColegio = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("grado", sql.Int, req.body.grado)
    .input("fk_id_institucion", sql.Int, req.body.fk_id_institucion)
    .query(
      `INSERT INTO colegio
        (grado, fk_id_institucion)
        VALUES 
        (@grado, @fk_id_institucion);
        SELECT SCOPE_IDENTITY() AS pk_id_colegio;`
    );
  console.log(result);
  res.json({
    grado: req.body.grado,
    fk_id_institucion: req.body.fk_id_institucion,
  });
};

export const updateColegio = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("grado", sql.Int, req.body.grado)
  .input("fk_id_institucion", sql.Int, req.body.fk_id_institucion)
  .query('UPDATE colegio SET grado = @grado, fk_id_institucion= @fk_id_institucion WHERE pk_id_colegio = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    grado: req.body.grado,
    fk_id_institucion: req.body.fk_id_institucion
  })
};

export const deleteColegio = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM colegio WHERE pk_id_colegio = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
