import "../../Styles/ElementStyle/_home.scss";

import { TypeAnimation } from "react-type-animation";
// eslint-disable-next-line no-unused-vars
import { motion as m, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { scrollY } = useScroll();
  
  // Transform scroll position to rotation values with perspective effect
  const rotateX = useTransform(scrollY, [0, 500], [0, 25]);
  const rotateY = useTransform(scrollY, [0, 500], [0, -5]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.85]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);

  const scrollToTopic = () => {
    const topicSection = document.getElementById("topic");
    if (topicSection) {
      topicSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const editorVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section id="home">
      <m.div 
        className="editor-container"
        variants={editorVariants}
        initial="hidden"
        animate="visible"
        style={{
          rotateX,
          rotateY,
          scale,
          y,
          transformPerspective: 1500,
          transformOrigin: "center top",
          willChange: "transform"
        }}
      >
        <div className="editor-header">
          <div className="window-controls">
            <FontAwesomeIcon icon={faCircle} className="control-dot close" />
            <FontAwesomeIcon icon={faCircle} className="control-dot minimize" />
            <FontAwesomeIcon icon={faCircle} className="control-dot maximize" />
          </div>
          <div className="file-info">
            <span className="file-name">visco.jsx</span>
          </div>
        </div>
        <div className="editor-content">
          <div className="code-area">
            <m.div 
              className="container text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <m.h1 variants={itemVariants}>
                Welcome to <span className="heavy-h1">Visco</span>
              </m.h1>
              <m.h2 variants={itemVariants}>
                Understanding when a complexity turns into <span>O(1)</span> -
                even it starts as <br />
                <TypeAnimation
                  sequence={["O(n²)", 1500, "O(n¹⁰⁰)", 1500, "O(log n)", 1500]}
                  speed={250}
                  wrapper="span"
                  className="type-animation"
                  repeat={Infinity}
                />
              </m.h2>
            </m.div>
          </div>
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          onClick={scrollToTopic}
          className="scrollToTopicIcon"
        />
      </m.div>
    </section>
  );
};

export default Home;
