// import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Added faTimes
import { useState, useEffect } from "react"; // Add useEffect
import { useNavigate, useLocation } from "react-router-dom"; // Add missing imports
import "../../Styles/CommonStyle/_navbar.scss";
import Logo from "../../Assets/logo_dark.png";

function NavigationBar() {
  // Fix useState syntax - these need to be separate
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Add these conditionally if you're using React Router
  const navigate = useNavigate();
  const location = useLocation();
  
  // Close navbar when a link is clicked
  const closeNavbar = () => {
    setExpanded(false);
  };
  
  // Toggle handler for mobile menu
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: "-20% 0px -20% 0px"
    });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavigation = (id) => {
    // Set active section when navigation occurs
    setActiveSection(id);
    // Close mobile menu
    setExpanded(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <Navbar 
      collapseOnSelect 
      expand="lg" 
      className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}
      expanded={expanded}
      fixed="top" // Add this prop to make the navbar sticky
    >
      <Container>
        <Navbar.Brand 
          onClick={() => handleNavigation('home')}
          style={{ cursor: 'pointer' }}
        >
          <img src={Logo} alt="Visco" width="55px" />
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={handleToggle} // Add toggle handler
        >
          <FontAwesomeIcon icon={expanded ? faTimes : faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="primary-links">
            <Nav.Link 
              onClick={() => handleNavigation('about')} // Fix onClick syntax
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavigation('topic')} // Fix onClick syntax
              className={activeSection === 'topic' ? 'active' : ''}
            >
              Topics
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
