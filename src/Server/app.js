import express from "express";
import ejerciciosResueltosRoutes from "./routers/ejercicios_resueltos_table.routes.js";
import ejerciciosRoutes from "./routers/ejercicios_table.routes.js";
import  nivelEventoRoutes  from "./routers/nivel_evento_table.routes.js";
import nivelRoutes from './routers/nivel_table.routes.js';
import personaRoutes from './routers/persona_table.routes.js';
import usuarioRoutes from "./routers/usuario_table.routes.js";
import colegioRoutes from './routers/colegio_table.routes.js';
import universidadRoutes from './routers/universidad_table.routes.js';
import eventoRoutes from './routers/evento_table.routes.js';
import institucionRoutes from "./routers/institucion_table.routes.js";
const app = express();
app.use(express.json());
app.use(ejerciciosResueltosRoutes)
app.use(ejerciciosRoutes);
app.use(nivelEventoRoutes);
app.use(personaRoutes);
app.use(usuarioRoutes);
app.use(colegioRoutes);
app.use(eventoRoutes);
app.use(nivelRoutes);
app.use(universidadRoutes);
app.use(institucionRoutes);


export default app;
