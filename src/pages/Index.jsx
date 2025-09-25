import { Navigation } from "@/components/Navigation";
import Hero from "@/components/Hero";
import { About } from "@/components/About";
import { Topics } from "@/components/Topics";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="topics">
          <Topics />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
