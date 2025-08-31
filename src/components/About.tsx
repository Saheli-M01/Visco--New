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
    <section className="py-24 px-6 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Making Algorithms{" "}
            <span className="gradient-text">Accessible</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Visco transforms the way you learn algorithms. Through interactive visualizations, 
            comprehensive code examples, and intuitive controls, we make even the most complex 
            algorithms easy to understand and remember.
          </p>
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
              <div className="card-topic h-full text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6 mx-auto"
                >
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
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
          <div className="bg-gradient-to-br from-card to-muted/50 border border-border/50 rounded-3xl p-12">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
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