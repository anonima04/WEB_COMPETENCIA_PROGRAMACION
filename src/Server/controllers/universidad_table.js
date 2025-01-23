import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getUniversidades = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM universidad");
  res.json(result.recordset);
};

export const getUniversidad = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM universidad WHERE pk_id_universidad = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createUniversidad = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("semestre", sql.Int, req.body.semestre)
    .input("fk_id_institucion", sql.Int, req.body.fk_id_institucion)
    .input("nombre_programa", sql.NChar, req.body.nombre_programa)
    .query(
      `INSERT INTO universidad
        (semestre, fk_id_institucion, nombre_programa)
        VALUES 
        (@semestre, @fk_id_institucion, @nombre_programa);
        SELECT SCOPE_IDENTITY() AS pk_id_universidad;`
    );
  console.log(result);
  res.json({
    semestre: req.body.semestre,
    fk_id_institucion: req.body.fk_id_institucion,
    nombre_programa: req.body.nombre_programa
  });
};

export const updateUniversidad = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("semestre", sql.Int, req.body.semestre)
  .input("nombre_programa", sql.NChar, req.body.nombre_programa)
  .input("fk_id_institucion", sql.Int, req.body.fk_id_institucion)
  .query('UPDATE universidad SET semestre = @semestre, fk_id_institucion= @fk_id_institucion, nombre_programa= @nombre_programa WHERE pk_id_universidad = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    semestre: req.body.semestre,
    fk_id_institucion: req.body.fk_id_institucion,
    nombre_programa: req.body.nombre_programa
  })
};

export const deleteUniversidad = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM universidad WHERE pk_id_universidad = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
