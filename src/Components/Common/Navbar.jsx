
import { Container, Navbar, Nav } from "react-bootstrap";
import "../../Styles/CommonStyle/_navbar.scss";
import Logo from "../../Assets/logo_dark.png";

const NavigationBar = () => {




  return (
    <Navbar  className="custom-navbar">
      <Container className="navbar-container">
        <Navbar.Brand className="brand-logo">
          <img src={Logo} alt="Visco-logo" className="logo" width={55} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
