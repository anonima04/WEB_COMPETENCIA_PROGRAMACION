import { getConnection } from "../database/connection.js";
import sql from "mssql";
import jwt from "jsonwebtoken"; 

export const getUsuarios = async (req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM usuario");
  res.json(result.recordset);
};
export const getUsuario = async (req, res) => {
  console.log("Params:", req.params); // Verifica que los parámetros están llegando
  console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM usuario  WHERE pk_id_usuario = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(result.recordset[0]);
};

export const createUsuario = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("correo_usuario", sql.NChar, req.body.correo_usuario)
    .input("rol_persona", sql.NChar, req.body.rol_persona)
    .input("fecha_registro", sql.DateTime, req.body.fecha_registro)
    .input("estado_usuario", sql.NChar, req.body.estado_usuario)
    .input("contrasena_usuario", sql.VarChar, req.body.contrasena_usuario)
    .input("fk_id_persona", sql.Int, req.body.fk_id_persona)
    .query(
      "INSERT INTO usuario (correo_usuario, rol_persona, fecha_registro, estado_usuario, contrasena_usuario, fk_id_persona) VALUES (@correo_usuario, @rol_persona, @fecha_registro, @estado_usuario, @contrasena_usuario, @fk_id_persona); SELECT SCOPE_IDENTITY() AS pk_id_usuario;"
    );
  console.log(result);
  res.json({
    correo_usuario: req.body.correo_usuario,
    rol_persona: req.body.rol_persona,
    fecha_registro: req.body.fecha_registro,
    contrasena_usuario: req.body.contrasena_usuario,
    estado_usuario: req.body.estado_usuario,
    fk_id_persona: req.body.fk_id_persona,  
  });
};

export const updateUsuario = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .input("correo_usuario", sql.NChar, req.body.correo_usuario)
    .input("rol_persona", sql.NChar, req.body.rol_persona)
    .input("fecha_registro", sql.DateTime, req.body.fecha_registro)
    .input("estado_usuario", sql.NChar, req.body.estado_usuario)
    .input("contrasena_usuario", sql.VarChar, req.body.contrasena_usuario)
    .input("fk_id_persona", sql.Int, req.body.fk_id_persona)
    .query(
      'UPDATE usuario SET correo_usuario = @correo_usuario, rol_persona= @rol_persona, fecha_registro= @fecha_registro, estado_usuario= @estado_usuario, contrasena_usuario = @contrasena_usuario, fk_id_persona= @fk_id_persona WHERE pk_id_usuario = @id');
    if (result.rowsAffected[0]===0){
      return res.status(404).json({message: "Product not found"});
    }
    res.json({
      id: req.params.id,
      fk_id_persona: req.body.fk_id_persona,
      contrasena_usuario: req.body.contrasena_usuario,
      estado_usuario: req.body.estado_usuario,
      fecha_registro: req.body.fecha_registro,
      rol_persona: req.body.rol_persona,
      correo_usuario: req.body.correo_usuario
    })
};

export const deleteUsuario = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM usuario WHERE pk_id_usuario = @id");
  console.log(result);

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json({ message: "Product deleted" });
};

export const login = async (req, res) => {
  const { correo_usuario, contrasena_usuario } = req.body;
  console.log("Datos recibidos del cliente:", req.body);
  console.log("Email recibido:", correo_usuario); // Verifica qué valor llega aquí
  console.log("Password recibido:", contrasena_usuario);

  try {
    const pool = await getConnection();
    const query = `
      SELECT correo_usuario, contrasena_usuario, estado_usuario
      FROM usuario
      WHERE RTRIM(correo_usuario) = @correo_usuario;
    `;
    const result = await pool
      .request()
      .input("correo_usuario", sql.VarChar, correo_usuario)
      .query(query);

    console.log("Resultado de la consulta:", result.recordset);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.recordset[0];

    if (user.estado_usuario.trim() !== "activo") {
      return res.status(403).json({ error: "El usuario está inactivo" });
    }

    if (contrasena_usuario !== user.contrasena_usuario) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ correo_usuario: user.correo_usuario }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, message: "Login exitoso" });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
