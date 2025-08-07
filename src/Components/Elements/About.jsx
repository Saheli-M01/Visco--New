import React, { useRef } from 'react';
// eslint-disable-next-line
import { useInView, useAnimation, motion } from 'framer-motion';
import {
  faCode,
  faLightbulb,
  faChartLine,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Add this import
import "../../Styles/ElementStyle/_about.scss";

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

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  // Scroll-triggered animation controls
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { amount: 0.3 });

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
      </div>
    </section>
  );
};

export default About;
