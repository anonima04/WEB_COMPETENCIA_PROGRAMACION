import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const  getAsignacionesSalas = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM asignacion_sala");
  res.json(result.recordset);
};

export const getAsignacionSala = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM asignacion_sala WHERE pk_id_asignacion_sala = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createAsignacionSala = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("fk_id_sala", sql.Int, req.body.fk_id_sala)
    .input("fk_id_inscripcion", sql.Int, req.body.fk_id_inscripcion)
    .input("fk_id_nivel", sql.Int, req.body.fk_id_nivel)
    .input("cant_equipos", sql.Int, req.body.cant_equipos)
    .query(
      `INSERT INTO asignacion_sala
        (fk_id_sala, fk_id_inscripcion, fk_id_nivel, cant_equipos)
        VALUES 
        (@fk_id_sala, @fk_id_inscripcion, @fk_id_nivel, @cant_equipos);
        SELECT SCOPE_IDENTITY() AS pk_id_asignacion_sala;`
    );
  console.log(result);
  res.json({
    fk_id_inscripcion: req.body.fk_id_inscripcion,
    fk_id_sala: req.body.fk_id_sala,
    fk_id_nivel: req.body.fk_id_nivel,
    cant_equipos: req.body.cant_equipos

  });
};

export const updateAsignacionSala = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("fk_id_sala", sql.Int, req.body.fk_id_sala)
    .input("fk_id_inscripcion", sql.Int, req.body.fk_id_inscripcion)
    .input("fk_id_nivel", sql.Int, req.body.fk_id_nivel)
    .input("cant_equipos", sql.Int, req.body.cant_equipos)
  .query('UPDATE asignacion_sala SET fk_id_sala= @fk_id_sala, fk_id_inscripcion= @fk_id_inscripcion, fk_id_nivel= @fk_id_nivel, cant_equipos=@cant_equipos WHERE pk_id_asignacion_sala = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    fk_id_inscripcion: req.body.fk_id_inscripcion,
    fk_id_sala: req.body.fk_id_sala,
    fk_id_nivel: req.body.fk_id_nivel,
    cant_equipos: req.body.cant_equipos
  })
};

export const deleteAsignacionSala = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM asignacion_sala WHERE pk_id_asignacion_sala = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
