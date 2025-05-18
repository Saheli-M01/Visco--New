import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./Components/Common/Navbar";
import Home from "./Components/Elements/Home";
import About from "./Components/Elements/About";
import Topic from "./Components/Elements/Topic";
import Footer from "./Components/Common/Footer";
// import TopicLayout from './Components/TopicLayout/TopicLayout';
// import SortingPage from "./Components/Pages/Sort/Sort";
// import TreePage from "./Components/Pages/Tree/Tree";
// import GraphPage from "./Components/Pages/Graph/Graph";
// import ArrayPage from "./Components/Pages/Array/Array";
// import LinkedListPage from "./Components/Pages/LinkedList/LinkedList";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <NavigationBar />
              <main className="main-content">
            
                <Home/>
                <About/>
                <Topic/>
              </main>
              <Footer />
            </div>
          }
        />
        {/* <Route element={<TopicLayout />}>
          <Route path="/sort" element={<SortingPage />} />
          <Route path="/tree" element={<TreePage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/array" element={<ArrayPage />} />
          <Route path="/linked-list" element={<LinkedListPage />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
