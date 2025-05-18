import Navbar from "./Components/Common/Navbar";
import Home from "./Components/Elements/Home";
import About from "./Components/Elements/About";
import Topic from "./Components/Elements/Topic";
import Footer from "./Components/Common/Footer";
function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Home/>
        <About/>
        <Topic/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
