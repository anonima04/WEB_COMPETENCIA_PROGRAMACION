import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "mssql";
import { getConnection } from "./connection.js"; 

const app = express();
app.use(express.json());

//ruta login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await getConnection(); // Conexión a la BD

    // Consulta para verificar si el usuario existe
    const query = `
      SELECT correo_usuario, contrasena_usuario
      FROM usuario
      WHERE correo_usuario = @correo_usuario
    `;

    const result = await pool
      .request()
      .input("correo_usuario", sql.VarChar, email) // Parámetro seguro
      .query(query);

    // Verifica si se encontró el usuario
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.recordset[0];

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.contrasena_usuario);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Genera un token JWT
    const token = jwt.sign({ email: user.correo_usuario }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Login exitoso" });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Servidor
app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));
