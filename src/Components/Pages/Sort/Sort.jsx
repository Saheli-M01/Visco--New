import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../Styles/PageStyle/_topicStyle.scss";

const sortingAlgorithms = [
  // Comparison-Based Algorithms
  {
    name: "Bubble Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" },
    spaceComplexity: "O(1)",
  },
  {
    name: "Selection Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n²)" },
    spaceComplexity: "O(1)",
  },
  {
    name: "Insertion Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" },
    spaceComplexity: "O(1)",
  },
  {
    name: "Merge Sort",
    timeComplexity: {
      worst: "O(n log n)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(n)",
  },
  {
    name: "Quick Sort",
    timeComplexity: {
      worst: "O(n²)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(log n)",
  },
  {
    name: "Heap Sort",
    timeComplexity: {
      worst: "O(n log n)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(1)",
  },
  {
    name: "Shell Sort",
    timeComplexity: {
      worst: "O(n²)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(1)",
  }
];

const nonComparisonAlgorithms = [
  {
    name: "Counting Sort",
    timeComplexity: { worst: "O(n+k)", average: "O(n+k)", best: "O(n+k)" },
    spaceComplexity: "O(k)",
  },
  {
    name: "Radix Sort",
    timeComplexity: {
      worst: "O(d(n+k))",
      average: "O(d(n+k))",
      best: "O(d(n+k))",
    },
    spaceComplexity: "O(n+k)",
  },
  {
    name: "Bucket Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n+k)", best: "O(n+k)" },
    spaceComplexity: "O(n+k)",
  }
];

const Sort = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="topic-section">
      <div className="container">
        <nav aria-label="breadcrumb" className="mt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Sorting Algorithms</li>
          </ol>
        </nav>
        
        <h2 className="algorithm-category">Comparison-Based Algorithms</h2>
        <div className="row g-4">
          {sortingAlgorithms.map((algo, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <div className="topic-card">
                <div className="card-content">
                  <h5 className="card-name">{algo.name}</h5>
                  <div className="complexity">
                    <p>
                      <strong>Time Complexity:</strong>
                    </p>
                    <p>Worst: {algo.timeComplexity.worst}</p>
                    <p>Average: {algo.timeComplexity.average}</p>
                    <p>Best: {algo.timeComplexity.best}</p>
                    <p>
                      <strong>Space Complexity:</strong> {algo.spaceComplexity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="algorithm-category mt-5">Non-Comparison-Based Algorithms</h2>
        <div className="row g-4">
          {nonComparisonAlgorithms.map((algo, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <div className="topic-card">
                <div className="card-content">
                  <h5 className="card-name">{algo.name}</h5>
                  <div className="complexity">
                    <p>
                      <strong>Time Complexity:</strong>
                    </p>
                    <p>Worst: {algo.timeComplexity.worst}</p>
                    <p>Average: {algo.timeComplexity.average}</p>
                    <p>Best: {algo.timeComplexity.best}</p>
                    <p>
                      <strong>Space Complexity:</strong> {algo.spaceComplexity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sort;