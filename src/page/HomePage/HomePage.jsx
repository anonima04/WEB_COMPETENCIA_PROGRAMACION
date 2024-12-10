import NavBar from "../../components/navBar/NavBar";
import "./HomePage.css";
import Footer from "../../components/footer/Footer";

const homePage = () => {
  return (
    <div className="body-homepage">
      <NavBar></NavBar>
      <div className="text-homepage">
        <img
          className="img-logo-semillero"
          src="/img/Imagen1.png"
          alt="imagen del semillero de programación"
        ></img>
        <div className="text-carousel">
          <div className="text-wrapper">
            <p className="text">
              SI SIENTES <strong>PASIÓN</strong> POR LA PROGRAMACIÓN,
            </p>
            <p className="text"></p>
            <p className="text">
              <strong>TE INVITAMOS</strong> A QUE HAGAS PARTE DE NUESTRO
              SEMILLERO.
            </p>
            <p className="text"> </p>
            <p className="text">
              <strong>APRENDIZAJE COLABORATIVO</strong> EN ESTRATEGIAS DE ALGORITMIA
            </p>
          </div>
        </div>
      </div>
      <Footer className="footer-homepage"></Footer>
    </div>
  );
};

export default homePage;
