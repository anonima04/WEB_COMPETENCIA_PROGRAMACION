import express from "express";
import historial_usuario_equipoRoutes from "./routers/historial_usuario_equipo.routes.js";
import historial_institucionRoutes from "./routers/historial_institucion.routes.js";
import equipoRoutes from "./routers/equipo.routes.js";
import asitencia_equipoRoutes from "./routers/asistencia_equipo.routes.js";
import asignacion_salaRoutes from './routers/asignacion_sala.routes.js'
import tipo_documentoRoutes from "./routers/tipo_documento.routes.js";
import salaRoutes from "./routers/sala_table.routes.js";
import inscripcionRoutes from "./routers/inscripcion_table.routes.js";
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
app.use(salaRoutes);
app.use(equipoRoutes);
app.use(historial_usuario_equipoRoutes);
app.use(asitencia_equipoRoutes);
app.use(asignacion_salaRoutes);
app.use(historial_institucionRoutes);
app.use(tipo_documentoRoutes);
app.use(inscripcionRoutes);
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
