import React, { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line
import { useInView, useAnimation, motion } from 'framer-motion';
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Add this import
import "../../Styles/ElementStyle/_about.scss";

const TypeWriter = ({ text, startTyping }) => {
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
    if (/^#[0-9A-Fa-f]{6}$/.test(word)) return "#6897BB";
    if (/^\d+$/.test(word)) return "#6897BB";
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
                  animation: startTyping
                    ? `typing 0.1s forwards ${currentPosition * 0.1}s`
                    : 'none',
                  animationFillMode: 'forwards',
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

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };
  const staggerVariant = {
    visible: { transition: { staggerChildren: 0.18 } }
  };
  const techBoxVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  // Scroll-triggered animation controls
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { amount: 0.3 });
  const rightInView = useInView(rightRef, { amount: 0.3 });

  // Typing animation key logic
  const [typingKey, setTypingKey] = useState(0);
  const prevInView = useRef(false);
  useEffect(() => {
    if (rightInView && !prevInView.current) {
      setTypingKey((k) => k + 1);
    }
    prevInView.current = rightInView;
  }, [rightInView]);

  return (
    <section id="about" className="text-center">
      <div className="container-fluid custom-container d-flex justify-content-center align-items-center">
        <motion.div
          ref={leftRef}
          className="left d-grid justify-content-center align-items-center"
          variants={containerVariant}
          initial="hidden"
          animate={leftInView ? 'visible' : 'hidden'}
        >
          <div className="feature d-grid justify-content-center align-items-center glass-background">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{ opacity: 0, y: 30 }}
                animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <FontAwesomeIcon icon={feature.icon} />
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
         
        </motion.div>
        <motion.div
          ref={rightRef}
          className="right"
          variants={containerVariant}
          initial="hidden"
          animate={rightInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="tech-stack glass-background"
            variants={staggerVariant}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
          >
            <h3>Tech Stack Used</h3>
            <div className="tech-boxes">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-box"
                  variants={techBoxVariant}
                  initial="hidden"
                  animate={rightInView ? 'visible' : 'hidden'}
                >
                  <div className="window-header">
                    <FontAwesomeIcon icon={tech.icon} />
                  </div>
                  <div className="code-content px-3">
                    <TypeWriter key={typingKey + tech.code} text={tech.code} startTyping={rightInView} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="mission"
            initial={{ opacity: 0, y: 30 }}
            animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3>Mission</h3>
            <p>
              Visco's mission is to empower students to grasp algorithms with
              clarity and confidence. By offering interactive visualizations and
              hands-on tools, Visco transforms abstract concepts into engaging,
              practical learning experiences—helping learners build a strong
              foundation in computer science.
            </p>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default About;
