import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import About from './component/About';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
  <Route exact path="/" element={<Home />}/>
  <Route exact path="/" element={<About />}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
