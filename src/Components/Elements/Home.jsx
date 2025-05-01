import "../../Styles/ElementStyle/_home.scss";
import { TypeAnimation } from "react-type-animation";
import Button from "react-bootstrap/Button";
const Home = () => {
    const scrollToTopic = () => {
      const topicSection = document.getElementById('topic');
      if(topicSection){
        topicSection.scrollIntoView({behavior: 'smooth'});
      }
    };
  return (
    <section id="home">
      <div className="container text-center">
        <h1>
          Welcome to <span className="heavy-h1">Visco</span>
        </h1>
        <h2>
          Understanding when a complexity turns into <span>O(1)</span> -
          even it starts as{" "}
          <br />
          <TypeAnimation
            sequence={["O(n²)", 1500, "O(n¹⁰⁰)", 1500, "O(log n)", 1500]}
            speed={250}
            wrapper="span"
            className="type-animation"
            repeat={Infinity}
          />
        </h2>{" "}
        <Button className="button mt-5" onClick={scrollToTopic} >
          Dive in <i className="ms-2 fa-solid fa-terminal"></i>
        </Button>
      </div>
    </section>
  );
};
export default Home;
