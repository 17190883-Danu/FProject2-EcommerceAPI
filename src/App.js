import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import ProductDetail from './components/Prodet';
import LoginForm from './components/LoginForm';

function App() {
  const path = useLocation();
  console.log(path)
  return (
    <div className="App">
          {path.pathname.toLowerCase() !== "/login" && <Navbar />}
            <Routes>
                  <Route element={<LoginForm/>} path="/login"></Route>
                  <Route element={<Products/>} path="/"></Route>
                  <Route element={<ProductDetail/>} path="/:id"></Route>
          </Routes>  
    </div>
  );
}

export default App;

