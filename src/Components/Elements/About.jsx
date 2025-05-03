import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import {
  faCode,
  faLightbulb,
  faChartLine,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import {
  faReact,
  faJs,
  faBootstrap,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "../../Styles/ElementStyle/_about.scss";

const TypeWriter = ({ text }) => {
  const getColor = (word) => {
    const colorMap = {
      "#ed9a77": ["const", "function", "div"],
      "#d26cce": ["state", "setState", "useState"],
      "#88E08B": [
        "null", "animate", "container",
        "100vh", "flex"
      ],
      "#ab86f3": ["animationFrame"],
      "#f9d201": ["className", "#about"],
     
    };
  
    for (const [color, words] of Object.entries(colorMap)) {
      if (words.includes(word)) return color;
    }
  
    // Hex color literals like #FFEECC
    if (/^#[0-9A-Fa-f]{6}$/.test(word)) return "#6897BB";
  
    // Numbers
    if (/^\d+$/.test(word)) return "#6897BB";
  
    // Strings
    if (/^["'].*["']$/.test(word)) return "#6A8759";
  
    return "#A9B7C6"; // default
  };
  

  const words = text.split(/([^a-zA-Z0-9$#_-]+)/);
  let position = 0;
  
  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-word', margin: 0 }}>
      <code>
        {words.map((word, wordIndex) => {
          const chars = word.split('');
          const color = getColor(word);
          
          return chars.map((char, charIndex) => {
            const currentPosition = position++;
            return (
              <span 
                key={`${wordIndex}-${charIndex}`}
                style={{
                  color: color,
                  opacity: 0,
                  animation: `typing 0.1s forwards ${currentPosition * 0.1}s`,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word'
                }}
              >
                {char}
              </span>
            );
          });
        })}
      </code>
    </pre>
  );
};

const About = () => {
  const features = [
    {
      icon: faCode,
      title: "Interactive Learning",
      description:
        "Learn algorithms through hands-on visualization and interaction",
    },
    {
      icon: faLightbulb,
      title: "Step-by-Step Guide",
      description: "Detailed explanations of each algorithm's working process",
    },
    {
      icon: faChartLine,
      title: "Performance Analysis",
      description: "Understand time and space complexity of algorithms",
    },
    {
      icon: faGraduationCap,
      title: "Free Learning",
      description:
        "Empowering students with free access to quality algorithm education",
    },
  ];
  const techStack = [
    {
      name: "React",
      icon: faReact,
      code: "const [state, setState] = useState(null);",
    },
    {
      name: "Bootstrap",
      icon: faBootstrap,
      code: '<div className ="container">',
    },
    {
      name: "JavaScript",
      icon: faJs,
      code: "function animate() {\n  animationFrame(animate);\n}",
    },
    
    {
      name: "Sass",
      icon: faSass,
      code: "#about {\n  min-height: 100vh;\n  display: flex;\n}",
    },
  ];

  return (
    <section id="about">

      <div className="container-fluid custom-container d-flex justify-content-center align-items-center">
        <div className="left d-grid justify-content-center align-items-center">
          <div className="feature d-grid justify-content-center align-items-center glass-background">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <FontAwesomeIcon icon={feature.icon} />
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="contact  glass-background">
            <h3>Contacts</h3>
            <div className="contact-icons">
              <a href="mailto:your.email@example.com" className="contact-icon">
                <FontAwesomeIcon icon={faAt} />
                <span>Email</span>
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                className="contact-icon"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="mission">
            <h3>Mission</h3>
            <p>
              Visco's mission is to empower students to grasp algorithms with
              clarity and confidence. By offering interactive visualizations and
              hands-on tools, Visco transforms abstract concepts into engaging,
              practical learning experiences—helping learners build a strong
              foundation in computer science.
            </p>
          </div>
          <div className="tech-stack  glass-background">
            <h3>Tech Stack Used</h3>
            <div className="tech-boxes">
              {techStack.map((tech, index) => (
                <div key={index} className="tech-box">
                  <div className="window-header">
                    <FontAwesomeIcon icon={tech.icon} />
                  </div>
                  <div className="code-content px-3">
                    <TypeWriter text={tech.code} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
