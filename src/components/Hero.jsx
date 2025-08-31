import { TypeAnimation } from "react-type-animation";
import { motion as m, useScroll, useTransform } from "framer-motion";
import { Circle, ChevronDown } from "lucide-react";

export const Hero = () => {
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
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
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
        duration: 0.8,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 px-4 py-8">
      <m.div
        className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl border border-gray-200 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden flex flex-col"
        variants={editorVariants}
        initial="hidden"
        animate="visible"
        style={{ rotateX, rotateY, scale, y, transformPerspective: 1500, transformOrigin: "center top", willChange: "transform" }}
      >
        {/* Editor top bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 border-b border-gray-300 rounded-t-2xl">
          <Circle className="w-4 h-4 text-red-400" />
          <Circle className="w-4 h-4 text-yellow-400" />
          <Circle className="w-4 h-4 text-green-400" />
          <span className="ml-4 text-xs text-gray-500 font-mono">visco.jsx</span>
        </div>
        {/* Editor content area */}
        <div className="flex flex-col items-center justify-center px-8 py-12 bg-white/80 rounded-b-2xl">
          <m.div className="w-full text-center" variants={containerVariants} initial="hidden" animate="visible">
            <m.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
              Welcome to <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Visco</span>
            </m.h1>
            <m.h2 variants={itemVariants} className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Understanding when a complexity turns into <span className="font-bold text-blue-600">O(1)</span> - even it starts as <br />
              <TypeAnimation
                sequence={["O(n²)", 1500, "O(n¹⁰⁰)", 1500, "O(log n)", 1500]}
                speed={250}
                wrapper="span"
                className="type-animation font-mono text-purple-600"
                repeat={Infinity}
              />
            </m.h2>
          </m.div>
        </div>
      </m.div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown
          onClick={scrollToTopic}
          className="w-10 h-10 text-blue-500 cursor-pointer animate-bounce"
        />
      </m.div>
    </section>
  );
};

