import { motion } from "framer-motion";
import { Code, Eye, BookOpen, Zap } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: Eye,
      title: "Visual Learning",
      description: "Watch algorithms come to life with smooth, interactive animations that make complex concepts crystal clear."
    },
    {
      icon: Code,
      title: "Multi-Language Support",
      description: "Study implementations in C++, Java, and Python with syntax highlighting and detailed explanations."
    },
    {
      icon: BookOpen,
      title: "Step-by-Step Guide",
      description: "Follow along with detailed breakdowns of each algorithm step, understanding the why behind every move."
    },
    {
      icon: Zap,
      title: "Interactive Controls",
      description: "Play, pause, step through, and control the speed of visualizations to learn at your own pace."
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className=" rounded-3xl px-12 py-16  mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Making Algorithms{" "}
              <span className="text-gray-700">Accessible</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Visco transforms the way you learn algorithms. Through interactive visualizations, 
              comprehensive code examples, and intuitive controls, we make even the most complex 
              algorithms easy to understand and remember.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-8 shadow-lg h-full text-center hover:bg-white/15 transition-all">
                <motion.div
                  whileHover={{ scale: 1.1}}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl mb-6 mx-auto shadow-md"
                >
                  <feature.icon className="h-8 w-8 text-gray-900" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className=" rounded-3xl px-12  ">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              We believe that understanding algorithms shouldn't be a barrier to becoming a great programmer. 
              By combining visual learning with hands-on interaction, Visco empowers learners at all levels 
              to master data structures and algorithms with confidence and clarity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};