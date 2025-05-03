import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/CommonStyle/_navbar.scss";
import Logo from "../../Assets/logo_dark.png";

function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

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
      fixed="top"
    >
      <Container>
        <Navbar.Brand 
          onClick={() => handleNavigation('home')}
          style={{ cursor: 'pointer' }}
        >
          <img src={Logo} alt="Visco" width="55px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="primary-links">
            <Nav.Link 
              onClick={() => handleNavigation('about')}
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavigation('topic')}
              className={activeSection === 'topic' ? 'active' : ''}
            >
              Topics
            </Nav.Link>
          </Nav>
          <Nav id="contacts">
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
