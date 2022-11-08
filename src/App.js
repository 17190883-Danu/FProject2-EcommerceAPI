import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import ProductDetail from './components/Prodet';
import LoginForm from './components/LoginForm';

function App() {
  const path = useLocation();
  // console.log(path)
  return (
    <div className="App">
          {path.pathname.toLowerCase() !== "/login" && <Navbar />}
            <Routes>
                  <Route element={<LoginForm/>} path="/login" />
                  <Route element={<Products/>} exact path="/" />
                  <Route element={<Cart />} path="/cart" />
                  <Route element={<ProductDetail/>} path="/product/:id" />
          </Routes>  
    </div>
  );
}

export default App;

