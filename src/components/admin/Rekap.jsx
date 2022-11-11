import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPurchaseRecord
} from "../../redux/reducer/handleProduct";
import { useNavigate } from "react-router-dom";

function Rekap() {
  const rekap = useSelector((state) => state.product.purchaselogs);
  const calculeTotal = rekap.reduce((sum, i) => sum + (i.qty * i.price), 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPurchaseRecord());
  }, []);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem('login'))
    if(login === null || login.isadmin == false) {
      navigate('/login')
    }
  }, [])
  
  // console.log('rekap ',rekap)

  const emptyCart = () => {
    return (
      <div className="container m-24">
        <h1 className="my-10 text-center">Belum ada riwayat pembelian</h1>
      </div>
    );
  };

  return (
    <div className="bg-white">
      {rekap.length === 0 ? (
        emptyCart()
      ) : (
        <div className="container mt-3 max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-black-soft">
            Rekap Penjualan
          </h2>
          <div className="d-flex flex-row gap-5">
            <div className="shadow-sm border rounded-3 p-3 w-75">
              <table class="table table-striped w-100">
                <thead class="">
                  <tr class="">
                    <th>Product</th>
                    <th className="w-20">Harga</th>
                    <th>Terjual</th>
                    <th>Rekap Penjualan</th>
                  </tr>
                </thead>
                <tbody>
                  {rekap.map((products) => (
                    <tr key={products.id}>
                      <td>
                        {products.title}
                        <td />
                        {products.category}
                      </td>
                      <td>
                        $ {products.price}
                      </td>
                      <td>
                        {products.qty}
                      </td>
                      <td>
                        $ {(products.price * products.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total Pendapatan: </th>
                    <th className="col-span-2">$ {calculeTotal.toFixed(2)}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="rounded-3 border shadow-sm w-25">
              <div className="p-3">
                <h6 className="text-start">Total Pendapatan</h6>
                <h6 className="text-start">$ {calculeTotal.toFixed(2)}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rekap; 