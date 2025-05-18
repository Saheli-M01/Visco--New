import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faEllipsis,
  faList,
  faSitemap,
  faHexagonNodes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../Styles/ElementStyle/_topic.scss";
const Topic = () => {
  const naviagte = useNavigate();
  const handleTopicClick = (path) => {
    naviagte(path);
  };

  const topics = [
    {
      title: "Sorting Algorithms",
      icon: faArrowUpWideShort,
      description:
        "Explore various sorting techniques and their implementations",
      path: "/sort",
    },
    {
      title: "Tree Structures",
      icon: faSitemap,
      description: "Discover hierarchical data structures and tree traversals",
      path: "/tree",
    },
    {
      title: "Graph Algorithms",
      icon: faHexagonNodes,
      description: "Learn about networks, paths, and graph-based problems",
      path: "/graph",
    },
    {
      title: "Array Operations",
      icon: faEllipsis,
      description: "Master fundamental array manipulations and algorithms",
      path: "/array",
    },
    {
      title: "Linked Lists",
      icon: faList,
      description: "Understand sequential data structures and pointer concepts",
      path: "/linked-list",
    },
  ];
  return (
    <section id="topic" className="text-center">
      <h2>Topic overview</h2>
      <div className="container-fluid custom-container">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="topic-card"
            onClick={() => handleTopicClick(topic.path)}
          >
            <div className="card-icon">
              <FontAwesomeIcon icon={topic.icon} />
            </div>
            <div className="card-content">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
          </div>
        ))}{" "}
      </div>
    </section>
  );
};
export default Topic;
