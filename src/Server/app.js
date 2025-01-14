import express from "express";
// import personaRoutes from './routers/persona_table.routes.js';
import usuarioRoutes from "./routers/usuario_table.routes.js";
const app = express();
app.use(express.json());
// app.use(personaRoutes);
app.use(usuarioRoutes);


export default app;
