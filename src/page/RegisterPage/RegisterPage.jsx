import "./RegisterPage.css";

import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const documentTypeMap = {
      CC: 1,
      TI: 2,
      CE: 6,
    };

    const personPayload = {
      prim_nombre: data.firstName.toLowerCase(),
      seg_nombre: data.secondName.toLowerCase(),
      prim_apellido: data.firstLastName.toLowerCase(),
      seg_apellido: data.secondLastName.toLowerCase(),
      fk_id_documento: documentTypeMap[data.documentType] || null,
      numero_documento: data.documentNumber,
    };

    try {
      // 1. Crear persona
      const response = await fetch("http://localhost:5000/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personPayload),
      });

      const personaResult = await response.json();
      const personaId = personaResult.pk_id_persona;

      if (!personaId)
        throw new Error("No se pudo obtener el ID de la persona creada");

      const userPayload = {
        fk_id_persona: personaId,
        contrasena_usuario: data.password,
        correo_usuario: data.email,
        rol_persona: "estudiante",
        fecha_registro: new Date().toISOString(),
        estado_usuario: "activo",
      };

      const userResponse = await fetch("http://localhost:5000/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      const userResult = await userResponse.json();
      if (!userResult.success && !userResult.pk_id_usuario) {
        throw new Error("No se pudo crear el usuario");
      }

      const institucionId = parseInt(data.institution);
      if (isNaN(institucionId)) {
        throw new Error("ID de institución inválido");
      }

      const historyPayload = {
        fk_id_institucion: institucionId,
        fk_id_persona: personaId,
        fecha_inicio: new Date().toISOString(),
        fecha_fin: null,
      };

      const historyResponse = await fetch(
        "http://localhost:5000/historial_institucion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(historyPayload),
        }
      );

      const historyResult = await historyResponse.json();
      if (!historyResult.success && !historyResult.pk_id_historial) {
        throw new Error("No se pudo registrar el historial de institución");
      }

      // ✅ Solo si todo funcionó
      alert(
        "Usuario registrado correctamente, redirigiendo a inicio de sesión..."
      );
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar. Verifica los datos o intenta más tarde.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit} method="POST">
        <h1 className="form-title">Registrar usuario</h1>

        <div className="form-grid">
          <div>
            <label>Primer nombre</label>
            <input
              type="text"
              name="firstName"
              placeholder="Primer nombre"
              required
            />
          </div>

          <div>
            <label>Segundo nombre</label>
            <input type="text" name="secondName" placeholder="Segundo nombre" />
          </div>

          <div>
            <label>Primer apellido</label>
            <input
              type="text"
              name="firstLastName"
              placeholder="Primer apellido"
              required
            />
          </div>

          <div>
            <label>Segundo apellido</label>
            <input
              type="text"
              name="secondLastName"
              placeholder="Segundo apellido"
            />
          </div>

          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
            />
          </div>

          <div>
            <label>Tipo de documento</label>
            <select name="documentType" required>
              <option value="">Seleccione un tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <div>
            <label>Número de documento</label>
            <input
              type="number"
              name="documentNumber"
              placeholder="Número de documento"
              required
            />
          </div>
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
