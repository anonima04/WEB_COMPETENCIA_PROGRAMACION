import { getConnection } from "../database/connection.js";
import sql from "mssql";
export const getEventos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM evento");
  res.json(result.recordset);
};

export const getEvento = async(req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query("SELECT * FROM evento WHERE pk_id_evento = @id");
  
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Producto not found"});
  }
  return res.json(result.recordset[0]);
};

export const createEvento = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("cupos_eventos", sql.Int, req.body.grado)
    .input("nombre_evento", sql.NChar, req.body.nombre_evento)
    .input("fecha_limite_inscripcion", sql.DateTime, req.body.fecha_limite_inscripcion)
    .input("nro_ejercicios_evento", sql.Int, req.body.nro_ejercicios_evento)
    .input("fecha_inicio_inscripcion", sql.DateTime, req.body.fecha_inicio_inscripcion)
    .input("nro_personas_evento", sql.Int, req.body.nro_personas_evento)
    .input("hora_evento", sql.Time, req.body.hora_evento)
    .input("estado_evento", sql.NChar, req.estado_evento)
    .input("url_evento", sql.VarChar, req.body.url_evento)
    .query(
      `INSERT INTO evento
        (nombre_evento, cupos_eventos, fecha_limite_inscripcion, nro_ejercicios_evento, fecha_inicio_inscripcion, nro_personas_evento, hora_evento, estado_evento, url_evento)
        VALUES 
        (@nombre_evento, @cupos_eventos, @fecha_limite_inscripcion, @nro_ejercicios_evento, @fecha_inicio_inscripcion, @nro_personas_evento, @hora_evento, @estado_evento, @url_evento);
        SELECT SCOPE_IDENTITY() AS pk_id_evento;`
    );
  console.log(result);
  res.json({
    nombre_evento: req.body.nombre_evento,
    cupos_eventos: req.body.cupos_eventos,
    fecha_limite_inscripcion: req.body.fecha_limite_inscripcion,
    nro_ejercicios_evento: req.body.nro_ejercicios_evento,
    fecha_inicio_inscripcion: req.body.fecha_inicio_inscripcion,
    nro_personas_evento: req.body.nro_personas_evento,
    hora_evento: req.body.hora_evento,
    estado_evento: req.body.estado_evento,
    url_evento: req.body.url_evento
  });
};

export const updateEvento = async (req, res) => {
  const pool = await getConnection()
  const result= await pool.request()
  .input("id", sql.Int, req.params.id)
  .input("cupos_eventos", sql.Int, req.body.grado)
  .input("nombre_evento", sql.NChar, req.body.nombre_evento)
  .input("fecha_limite_inscripcion", sql.DateTime, req.body.fecha_limite_inscripcion)
  .input("nro_ejercicios_evento", sql.Int, req.body.nro_ejercicios_evento)
  .input("fecha_inicio_inscripcion", sql.DateTime, req.body.fecha_inicio_inscripcion)
  .input("nro_personas_evento", sql.Int, req.body.nro_personas_evento)
  .input("hora_evento", sql.Time, req.body.hora_evento)
  .input("estado_evento", sql.NChar, req.estado_evento)
  .input("url_evento", sql.VarChar, req.body.url_evento)
  .query('UPDATE evento SET nombre_evento = @nombre_evento, cupos_eventos= @cupos_eventos, fecha_limite_inscripcion= @fecha_limite_inscripcion, nro_ejercicios_evento= @nro_ejercicios_evento, fecha_inicio_inscripcion= @fecha_inicio_inscripcion, nro_personas_evento= @nro_personas_evento, hora_evento= @hora_evento, estado_evento= @estado_evento, url_evento = @url_evento WHERE pk_id_evento = @id')
 
  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"})
  }
  res.json({
    id: req.params.id,
    nombre_evento: req.body.nombre_evento,
    cupos_eventos: req.body.cupos_eventos,
    fecha_limite_inscripcion: req.body.fecha_limite_inscripcion,
    nro_ejercicios_evento: req.body.nro_ejercicios_evento,
    fecha_inicio_inscripcion: req.body.fecha_inicio_inscripcion,
    nro_personas_evento: req.body.nro_personas_evento,
    hora_evento: req.body.hora_evento,
    estado_evento: req.body.estado_evento,
    url_evento: req.body.url_evento
  })
};

export const deleteEvento = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
  .input("id", sql.Int, req.params.id)
  .query("DELETE FROM evento WHERE pk_id_evento = @id");
  console.log(result)

  if(result.rowsAffected[0]===0){
    return res.status(404).json({message: "Product not found"});
  }
  return res.json({message: "Product deleted"});
 
};
