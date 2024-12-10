import "./Footer.css";

const Footer = () => {
  return (
    <div className="body-footer">
      <div className="footer-section">
        <p>
          Contáctanos:{" "}
          <a href="mailto:di.espinosa@udla.edu.co">di.espinosa@udla.edu.co</a>
        </p>
      </div>
      <div className="footer-section">
        <p>2024, Todos los derechos reservados | Semillero de Programación |</p>
      </div>
      <div className="footer-section">
        <p>Síguenos en:</p>
        <a href="https://www.facebook.com/share/g/1Aychbhaek/">
          <img
            src="/img/facebook.webp"
            alt="Facebook"
            className="footer-icon"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
