import { TypeAnimation } from "react-type-animation";
import { motion as m, useScroll, useTransform } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Hero = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 400], [0, 40]);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 px-4 py-16"
    >
      {/* Parallax gradient blobs */}
      <m.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-3xl"
      />
      <m.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/30 blur-3xl"
      />

      <m.div
        className="w-full max-w-5xl mx-auto rounded-3xl relative overflow-hidden flex flex-col items-center border border-gray-200/70 bg-white/80 backdrop-blur shadow-2xl"
        initial="hidden"
        animate="visible"
      >
        {/* Decorative Lottie (desktop) */}
        <div className="pointer-events-none absolute -right-6 -top-6 hidden md:block opacity-90">
          <DotLottieReact
            src="https://lottie.host/bfbb3828-78cf-4c15-a7f0-b16ecb6bfa26/rgU8VhZ6De.lottie"
            loop
            autoplay
            style={{ width: 220, height: 220 }}
          />
        </div>

        {/* Spotlight hover overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(99,102,241,0.12), transparent 40%)",
          }}
        />

        <m.div
          className="w-full text-center px-6 pb-10"
          initial="hidden"
          animate="visible"
        >
          <m.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900 font-sans"
          >
            Welcome to
            <span className="block mt-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Visco
            </span>
          </m.h1>

          <m.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto"
          >
            Understanding when a complexity turns into{" "}
            <span className="font-semibold text-blue-600">O(1)</span> — even if
            it starts as
            <br />
            <TypeAnimation
              sequence={["O(n²)", 1500, "O(n³)", 1500, "O(n log n)", 1500]}
              speed={250}
              wrapper="span"
              className="font-mono text-purple-600"
              repeat={Infinity}
            />
          </m.p>

          {/* Animated code preview */}
          <m.pre
            variants={itemVariants}
            
            className="mx-auto w-full max-w-3xl text-left rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 font-mono text-sm text-gray-800 shadow-sm"
          >
            {`function algorithmSteps() {
  return ["confusion", "dry run", "visualize", "understood "];
}

console.log(algorithmSteps());`}
          </m.pre>

          {/* Mobile Lottie below CTAs */}
          <div className="mt-6 md:hidden">
            <DotLottieReact
              src="https://lottie.host/bfbb3828-78cf-4c15-a7f0-b16ecb6bfa26/rgU8VhZ6De.lottie"
              loop
              autoplay
              style={{ width: 180, height: 180 }}
            />
          </div>
        </m.div>
      </m.div>
    </section>
  );
};
