import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getEquipos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM equipo");
  res.json(result.recordset);
};

export const getEquipo = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM equipo WHERE pk_id_equipo = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createEquipo = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("nombre_equipo", sql.NChar, req.body.nombre_equipo)
    .input("estado_equipo", sql.NChar, req.body.estado_equipo)
    .query(
      `INSERT INTO equipo
        (nombre_equipo, estado_equipo)
        VALUES 
        (@nombre_equipo, @estado_equipo);
        SELECT SCOPE_IDENTITY() AS pk_id_equipo;`
    );
  console.log(result);
  res.json({
    nombre_equipo: req.body.nombre_equipo,
    estado_equipo: req.body.estado_equipo,
  });
};

export const updateEquipo = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("nombre_equipo", sql.NChar, req.body.nombre_equipo)
  .input("estado_equipo", sql.NChar, req.body.estado_equipo)
  .query('UPDATE equipo SET nombre_equipo = @nombre_equipo, estado_equipo= @estado_equipo WHERE pk_id_equipo = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    nombre_equipo: req.body.nombre_equipo,
    estado_equipo: req.body.estado_equipo,
  })
};

export const deleteEquipo = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM equipo WHERE pk_id_equipo = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
