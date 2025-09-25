import React, { useState, useEffect } from "react";

const TypeAnimation = ({ sequence, speed, className, repeat }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const texts = sequence.filter((item, index) => index % 2 === 0);
    const delays = sequence.filter((item, index) => index % 2 === 1);

    const timeout = setTimeout(
      () => {
        const currentWord = texts[currentIndex];

        if (!isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          if (currentText === currentWord) {
            setTimeout(() => setIsDeleting(true), delays[currentIndex] || 1000);
          }
        } else {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : speed || 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, sequence, speed]);

  return <span className={className}>{currentText}</span>;
};

// Linked List - Top Left
const LinkedListNode = ({ delay, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-1000 ${
        isVisible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        left: `5%`,
        marginLeft: `${index * 70}px`,
        top: `${8}%`,
        transform: isVisible ? "translateY(0)" : "translateY(-20px)",
      }}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 border-2 border-blue-500 bg-blue-100 rounded-lg flex items-center justify-center text-xs font-bold text-blue-800 shadow-sm">
          {index + 1}
        </div>
        {index < 4 && (
          <div className="flex items-center ml-1">
            <div className="w-12 h-0.5 bg-blue-500"></div>
            <div className="w-0 h-0 border-l-4 border-l-blue-500 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// Array - Top Right
const ArrayElement = ({ delay, index, value }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-800 ${
        isVisible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        left: `60%`, 
        marginLeft: `${index * 100}px`, 
        top: `5%`,
        transform: isVisible ? "scale(1)" : "scale(0.3)",
      }}
    >
      <div className="w-10 h-10 border-2 border-green-500 bg-green-100 rounded flex items-center justify-center text-sm font-bold text-green-800 shadow-sm">
        {value}
      </div>
      <div className="text-xs text-center text-green-600 mt-1">[{index}]</div>
    </div>
  );
};

// Stack - Right Side
const StackElement = ({ delay, index, value }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-800 ${
        isVisible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        right: "8%",
        top: `35%`,
        marginTop: `${index * 100}px`,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="w-10 h-8 border-2 border-orange-500 bg-orange-100 rounded flex items-center justify-center text-sm font-bold text-orange-800 shadow-sm">
        {value}
      </div>
      {index === 0 && (
        <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-xs text-orange-600 font-mono">
          ← TOP
        </div>
      )}
    </div>
  );
};

// Graph - Left Side (Now with fixed pixel positions)
const GraphNode = ({ delay, x, y, value }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-1000 ${
        isVisible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: isVisible
          ? "scale(1) rotate(0deg)"
          : "scale(0.3) rotate(180deg)",
      }}
    >
      <div className="w-9 h-9 border-2 border-indigo-500 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-800 shadow-lg">
        {value}
      </div>
    </div>
  );
};

const GraphEdge = ({ delay, from, to, weight }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <>
      <svg
        className={`absolute pointer-events-none transition-all duration-1000 ${
          isVisible ? "opacity-70" : "opacity-0"
        }`}
        style={{ left: 0, top: 0, width: "100%", height: "100%" }}
      >
        <line
          x1={`${from.x}px`}
          y1={`${from.y}px`}
          x2={`${to.x}px`}
          y2={`${to.y}px`}
          stroke="#6366f1"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
      </svg>
      <div
        className={`absolute text-xs font-bold bg-indigo-500 text-white px-1 py-0.5 rounded transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          left: `${midX}px`,
          top: `${midY}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {weight}
      </div>
    </>
  );
};

// Queue - Bottom Center
const QueueElement = ({ delay, index, value }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-800 ${
        isVisible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        left: `30%`,
        marginLeft: `${index * 100}px`,
        top: "89%",
        transform: isVisible ? "scale(1)" : "scale(0.8)",
      }}
    >
      <div className="w-8 h-8 border-2 border-teal-500 bg-teal-100 rounded flex items-center justify-center text-xs font-bold text-teal-800 shadow-sm">
        {value}
      </div>
      {index === 0 && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-teal-600 font-mono">
          FRONT
        </div>
      )}
      {index === 3 && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-teal-600 font-mono">
          REAR
        </div>
      )}
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4 py-8"
      style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.32) 1px, transparent 1px)`,
            backgroundSize: "3vw 3vw",
          }}
        />
      </div>

      {/* DSA Animation Elements - Optimally Positioned */}

      {/* Linked List - Top Left */}
      {Array.from({ length: 5 }, (_, i) => (
        <LinkedListNode key={`link-${i}`} delay={0.2 + i * 0.3} index={i} />
      ))}

      {/* Array - Top Right */}
      {["A", "L", "G", "O"].map((letter, i) => (
        <ArrayElement
          key={`array-${i}`}
          delay={2 + i * 0.2}
          index={i}
          value={letter}
        />
      ))}

      {/* Stack - Right Side */}
      {[1, 2, 3].map((value, i) => (
        <StackElement
          key={`stack-${i}`}
          delay={3.2 + i * 0.3}
          index={2 - i}
          value={value}
        />
      ))}

      {/* Graph - Left Side (Fixed positions) */}
      <GraphEdge
        delay={4.3}
        from={{ x: 90, y: 340 }}
        to={{ x: 170, y: 280 }}
        weight="7"
      />
      <GraphEdge
        delay={4.5}
        from={{ x: 170, y: 280 }}
        to={{ x: 250, y: 340 }}
        weight="3"
      />
      <GraphEdge
        delay={4.7}
        from={{ x: 250, y: 340 }}
        to={{ x: 170, y: 440 }}
        weight="5"
      />
      <GraphEdge
        delay={4.9}
        from={{ x: 170, y: 440 }}
        to={{ x: 90, y: 340 }}
        weight="2"
      />

      <GraphNode delay={4.1} x={72} y={322} value="A" />
      <GraphNode delay={4.2} x={152} y={262} value="B" />
      <GraphNode delay={4.4} x={232} y={322} value="C" />
      <GraphNode delay={4.6} x={152} y={422} value="D" />

      {/* Queue - Bottom Center */}
      {["Q1", "Q2", "Q3", "Q4"].map((value, i) => (
        <QueueElement
          key={`queue-${i}`}
          delay={7 + i * 0.2}
          index={i}
          value={value}
        />
      ))}

      {/* Main Content */}
      <div className="relative w-full max-w-5xl mx-auto z-10">
        <div className="text-center px-6 py-16">
          {/* Single Glassmorphic Container */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl px-12 py-16 shadow-xl">
            <h1
              className="font-black mb-8 leading-tight"
              style={{ fontSize: "clamp(2.5em, 8vw, 5em)" }}
            >
              <span className="text-gray-700 font-medium">Welcome to </span>
              <span className="text-gray-900 font-bold">Visco</span>
            </h1>

            <div className="mt-8">
              <p
                className="text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium"
                style={{ fontSize: "clamp(1.125em, 3vw, 1.5em)" }}
              >
                Understanding when complexity transforms into{" "}
                <span className="font-mono font-bold text-gray-900 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30 shadow-sm">
                  O(1)
                </span>{" "}
                — even if it starts as
              </p>

              <div
                className="font-mono font-bold min-h-[1.5em] flex items-center justify-center"
                style={{ fontSize: "clamp(1.5em, 4vw, 2.5em)" }}
              >
                <TypeAnimation
                  sequence={[
                    "O(n²)",
                    1500,
                    "O(n³)",
                    1500,
                    "O(n log n)",
                    1500,
                    "O(2ⁿ)",
                    1500,
                  ]}
                  speed={150}
                  className="text-gray-900"
                  repeat={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}