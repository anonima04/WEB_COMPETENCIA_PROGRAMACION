import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Archivo de estilos

const LoginPage = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Guarda el token
      alert("Login exitoso");
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Semillero de Programación</h1>
        <div className="user-logo-container">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </div>
        <div className="login-card-container">
          <div className="welcome-section">
            <h2>¡Bienvenido!</h2>
            <p className="text-login">
              Usted está ingresando a la plataforma del semillero de
              programación
            </p>
            <p className="text-login">
              <strong>
                Aprendizaje colaborativo en estrategias de algoritmia
              </strong>
            </p>
            <div className="logo-container">
              <img
                alt="logo de la universidad de la amazonia"
                src="/img/logoUni.png"
                className="logo"
              />
              <img
                alt="logo del semillero de programación"
                src="/img/logosp.png"
                className="logo"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="button-group">
            <button className="primary-button" onClick={handleLogin}>
              Iniciar Sesión
            </button>
            <button className="secondary-button" onClick={returnHome}>
              Regresar al inicio
            </button>
          </div>
          <p className="register-link" onClick={() => navigate("/register")}>
            ¿No estás registrado? Regístrate aquí
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
