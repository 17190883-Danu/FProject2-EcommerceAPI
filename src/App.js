import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import './App.css';
import {Routes, Route} from "react-router-dom";
import ProductDetail from './components/Prodet';

function App() {
  return (
    <div className="App">
            <Navbar/>
            <Routes>
                  <Route element={<Products/>} path="/"></Route>
                  <Route element={<ProductDetail/>} path="/:id"></Route>
          </Routes>  
    </div>
  );
}

export default App;

