import { Navigation, Hero, About, Topics, Footer } from "@/components/landing";

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
      <Footer />
    </div>
  );
};

export default Index;
