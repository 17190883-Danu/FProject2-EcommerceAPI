import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  increment,
  decrement,
  onChangeStock
} from "../../redux/reducer/handleProduct";
import {
  FiPlusCircle,
  FiMinusCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function UpdateStok() {
  const productLists = useSelector((state) => state.product.products);
  const productState = useSelector((state) => state.product);
  const [inputQty, setInputQty] = useState({});
  const stockRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    const login = (JSON.parse(localStorage.getItem('login')))
    if(login === null || login.isadmin == false) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    productLists.map((product) => {
      setInputQty((prev) => ({
        ...prev,
        [product.id]: product.stock,
      }));
    });
    console.log('asd')
  }, [productLists]);

  // console.log("productLists", JSON.parse(inputQty[1]));

  const handleButtonUpdate = (product) => {
    let newProduct = { ...product, qty: parseInt(inputQty) };
    console.log(newProduct);
    // dispatch(updateStockAdmin(newProduct));
  };

  const handleIncrement = (id, qty, index) => {
    if(qty >= 0) {
      dispatch(increment({id}))
      setInputQty((prev) => ({
        ...prev,
        [id]: qty + 1,
      }));
    }
  }

  const handleDecrement = (id, qty, index) => {
    if(qty > 0) {
      dispatch(decrement({id}))
      setInputQty((prev) => ({
        ...prev,
        [id]: qty - 1,
      }));
    }
  }

  const handleChange = (id, stock) => {
    if(stock < 0 || stock === null || stock === '') {
      stock = 0
    }
    setInputQty((prev) => ({
      ...prev,
      [id]: stock,
    }));
    stock = parseInt(stock)
    dispatch(onChangeStock({id, stock}))
  };

  return (
    <div className="container bg-white mt-4">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-black-soft">
          Products
        </h2>
        <div className="">
          <table class="table table-responsive border-collapse border border-black-soft-800">
            <thead class="table-dark">
              <tr class="border border-black-soft-600 p-2 bg-black-soft text-sm text-white h-5 w-5">
                <th>#</th>
                <th colSpan={2}>Product</th>
                <th className="text-center">Stok</th>
              </tr>
            </thead>
            <tbody>
              {productLists.map((products, index) => (
                <tr
                  key={products.id}
                  class="">
                  <td>{index + 1}</td>
                  <td>
                    {products.title}
                  </td>
                  <td>
                    {products.category}
                  </td>
                  <td align="right">
                    <button
                    className='btn btn-link text-decoration-none text-reset'
                    onClick={() => handleDecrement(products.id, inputQty[index+1], index)}
                    // disabled={cartState.isPending && true}
                    >
                      <FiMinusCircle />
                    </button>
                    <input 
                    type="number" 
                    className='border-bottom input-number w-25' 
                    id={`qtyInput${index}`} 
                    value={ inputQty[index+1]} 
                    style={{border: 'none', outline: 'none'}} 
                    onChange={(e) => handleChange(products.id, e.target.value)} 
                    min="0" />
                    <button
                    className='btn btn-link text-decoration-none text-reset'
                    onClick={() => handleIncrement(products.id, inputQty[index+1], index)}
                    // disabled={cartState.isPending && true}
                    >
                      <FiPlusCircle />
                    </button>
                    {/* <input
                      key={products.id}
                      type="text"
                      className={`form-control border border-black-soft-600 p-2 h-7 w-25 ...`}
                      placeholder={products.qty}
                      onChange={handleChange}
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UpdateStok;