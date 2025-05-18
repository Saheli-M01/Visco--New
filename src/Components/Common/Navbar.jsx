// import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Added faTimes
import { useState } from "react"; // Import useState
import "../../Styles/CommonStyle/_navbar.scss";
import Logo from "../../Assets/logo_dark.png";

function NavigationBar() {
  const [expanded, setExpanded] = useState(false); // Track navbar expanded state
  
  // Toggle handler
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar 
      expand="lg" 
      className="custom-navbar" 
      sticky="top"
      expanded={expanded} // Control expanded state
    >
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="Visco" width="55px" />
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={handleToggle}
          className={expanded ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={expanded ? faTimes : faBars} /> {/* Toggle between icons */}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="primary-links">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#topic">Topic</Nav.Link>
          </Nav>
          <Nav className="contacts">
          <Nav.Link 
              href="mailto:your.email@example.com" 
              className="contact-icon"
            >
              <FontAwesomeIcon icon={faAt} />
              <span>Email</span>
            </Nav.Link>

            <Nav.Link 
              href="https://linkedin.com/in/your-profile" 
              className="contact-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span>LinkedIn</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
