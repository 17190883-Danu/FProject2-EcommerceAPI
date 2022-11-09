import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import ProductDetail from './components/Prodet';
import LoginForm from './components/LoginForm';
import UpdateStok from './components/admin/UpdateStok';
import Rekap from './components/admin/Rekap';

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
                  <Route element={<Rekap />} path="/rekap" />
                  <Route element={<UpdateStok />} path="/update" />
          </Routes>  
    </div>
  );
}

export default App;

