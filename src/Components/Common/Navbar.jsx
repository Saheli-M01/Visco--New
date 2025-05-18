// import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Added faTimes
import { useState, useEffect } from "react"; // Add useEffect
import "../../Styles/CommonStyle/_navbar.scss";
import Logo from "../../Assets/logo_dark.png";

function NavigationBar() {
  const [expanded, setExpanded] = useState(false); // Track navbar expanded state
  const [activeSection, setActiveSection] = useState(''); // Track active section
  
  // Toggle handler
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  
  // Close navbar when a link is clicked
  const closeNavbar = () => {
    setExpanded(false);
  };

  // Add scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all sections - add 'home' to the array
      const sections = ['home', 'about', 'topic'];
      
      // Set initial value to empty or 'home' depending on scroll position
      let currentActive = '';
      
      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          // Add some buffer to make the highlighting more natural
          if (
            scrollPosition >= offsetTop - 100 && 
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            currentActive = section;
            break;
          }
        }
      }
      
      // Update active section
      setActiveSection(currentActive);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar 
      expand="lg" 
      className="custom-navbar" 
      sticky="top"
      expanded={expanded} // Control expanded state
    >
      <Container>
     
        <Navbar.Brand 
          href="#home" 
          onClick={closeNavbar}
          className={activeSection === 'home' ? 'active-brand' : ''}
        >
          <img src={Logo} alt="Visco" width="55px" />
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={handleToggle}
          className={expanded ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={expanded ? faTimes : faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="primary-links">
            <Nav.Link 
              href="#about" 
              onClick={closeNavbar}
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </Nav.Link>
            <Nav.Link 
              href="#topic" 
              onClick={closeNavbar}
              className={activeSection === 'topic' ? 'active' : ''}
            >
              Topic
            </Nav.Link>
          </Nav>
          <Nav className="contacts">
          <Nav.Link 
              href="mailto:visualizecode.official@gmail.com" 
              className="contact-icon"
              onClick={closeNavbar}
            >
              <FontAwesomeIcon icon={faAt} />
              <span>Email</span>
            </Nav.Link>

            <Nav.Link 
              href="https://www.linkedin.com/company/107360237/admin/dashboard/" 
              className="contact-icon"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeNavbar}
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
