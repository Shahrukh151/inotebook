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
    <h2>Mehmood app</h2>
    <h3>shahrukh</h3>
    <Routes>
  <Route exact path="/" element={<Home />}/>
  <Route exact path="/" element={<div><About /></div>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
