import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavigationBar from "./Components/Common/Navbar";
import ScrollToTop from "./Components/Common/ScrollToTop";
import Loading from "./Components/Common/Loading";
import Home from "./Components/Elements/Home";
import About from "./Components/Elements/About";
import Topic from "./Components/Elements/Topic";
import TopicLayout from './Components/TopicLayout/TopicLayout';
import Footer from "./Components/Common/Footer";
import SortingPage from "./Components/Pages/Sort/Sort";
import TreePage from "./Components/Pages/Tree/Tree";
import GraphPage from "./Components/Pages/Graph/Graph";
import ArrayPage from "./Components/Pages/Array/Array";
import LinkedListPage from "./Components/Pages/LinkedList/LinkedList";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <NavigationBar />
              <main className="main-content">
                <ScrollToTop />
                <Home/>
                <About/>
                <Topic/>
              </main>
              <Footer />
            </div>
          }
        />
        <Route element={<TopicLayout />}>
          <Route path="/sort" element={<SortingPage />} />
          <Route path="/tree" element={<TreePage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/array" element={<ArrayPage />} />
          <Route path="/linked-list" element={<LinkedListPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
