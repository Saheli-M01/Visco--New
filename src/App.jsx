import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/Common/Navbar";
import Home from "./Components/Elements/Home";
import About from "./Components/Elements/About";
import Topic from "./Components/Elements/Topic";
import Footer from "./Components/Common/Footer";

function App() {
  return (
    <>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
