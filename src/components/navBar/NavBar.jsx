/* eslint-disable no-unused-vars */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
// import AdbIcon from '@mui/icons-material/Adb';
import "./NavBar.css";

const pages = [
  "¿Quiénes somos?",
  "Nuestra Trayectoria",
  "Nuestras Actividades",
  "Ingresar o Registrarse"
];

function NavBar() {
  return (
    <>
      <AppBar position="sticky" className="AppBar">
        <Container maxWidth="xl" className="container-NavBar">
          <img id="logo" src="/img/log.png" alt="Logo universidad" />
          <a className="a-NavBar" href="/">
            SEMILLERO DE PROGRAMACIÓN
          </a>
          <div className="contenido">
            {pages.map((page) => (
              <a
                className="a-NavBar"
                key={page}
                href={
                  page === "Ingresar o Registrarse"
                    ? "/login"
                    : `/${page.toLowerCase().replace(" ", "-")}`
                }
              >
                {page}
              </a>
            ))}
          </div>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;