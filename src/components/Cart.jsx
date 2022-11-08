import { times } from 'lodash'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  showCart,
  deleteFromCart,
  increment,
  decrement,
  checkout
} from '../redux/reducer/handleCart'
import {
  FiTrash2,
  FiPlusCircle,
  FiMinusCircle,
} from 'react-icons/fi'

const Cart = () => {
  const cartData = useSelector(state => state.cart.cart)
  const cartState = useSelector(state => state.cart)
  const totalPrice = Object.values(cartData).reduce((a, b) => a + (b.price * b.qty), 0)
  const totalItem = Object.values(cartData).reduce((a, b) => a + b.qty, 0)

  const dispatch = useDispatch(); 
  const doFetch = () => {
    dispatch(showCart());
  }

  useEffect(() => {
    doFetch()
  }, [])

  const handleRemove = (id, name) => {
    if(window.confirm(`Yakin ingin menghapus barang ${name} dari belanjaan?`) == true) {
      dispatch(deleteFromCart(id))
    }
  }

  const handleDecrement = (id, qty, name) => {
    console.log('qty',qty)
    if(qty >= 1) {
      dispatch(decrement({id}))
    } else if(qty < 1) {
      handleRemove(id, name)
    }
  }
  
  const handleIncrement = (id, qty) => {
    if(qty > 0) {
      dispatch(increment({id}))
    } else {
      
    }
  }

  return (
    <>
      <div className="container my-5">
        <h1 className='mb-3'>Cart</h1>
        {cartData.length > 0 ? (
          <div className="d-flex flex-row justify-content-between align-items-start gap-5">
            <div className="d-flex flex-column gap-4 justify-content-between w-75">
              {cartState.loading ? <h1>Loading...</h1> : (
                cartData.map((item, index) => (
                  <div key={index} className="d-flex flex-row gap-3 rounded border shadow-sm p-3">
                    <img src={item.image} alt="product" style={{
                      maxWidth: '150px',
                      aspectRatio: '1/1',
                      objectFit: 'contain'
                    }} />
                    <div className="d-flex flex-column justify-content-between w-100">
                      <div className="info-product">
                        <h5>{item.title}</h5>
                        <p>${item.price}</p>
                      </div>
                      <div className="d-flex flex-row align-self-end">
                        <button
                        className='btn btn-link text-decoration-none text-reset mr-2'
                        onClick={() => handleRemove(item.cart_id, item.title)}
                        // disabled={cartState.isPending && true}
                        >
                          <FiTrash2 />
                        </button>
                        <button
                        className='btn btn-link text-decoration-none text-reset'
                        onClick={() => handleDecrement(item.cart_id, item.qty, item.title)}
                        // disabled={cartState.isPending && true}
                        >
                          <FiMinusCircle />
                        </button>
                        <input type="number" className='border-bottom input-number' id='qtyInput' value={item.qty} style={{border: 'none', outline: 'none'}} readOnly />
                        <button
                        className='btn btn-link text-decoration-none text-reset'
                        onClick={() => handleIncrement(item.cart_id, item.qty)}
                        // disabled={cartState.isPending && true}
                        >
                          <FiPlusCircle />
                        </button>
                      </div>
                    </div>
                  </div>
              )))}
            </div>
            <div className="d-flex flex-column w-25 rounded shadow-sm border p-3" style={{height: 'fit-content !important'}}>
              <h4>Cart Summary</h4>
              <hr />
              <div className="d-flex flex-column justify-content-start">
                {
                  cartData.map((item, index) => (
                    <div key={index} className="d-flex flex-column justify-content-between mb-3">
                      <p className='mb-0 text-start fw-semibold'>{item.title}</p>
                      <div className="d-flex flex-row justify-content-between w-100">
                        <p className='mb-1'>qty: {item.qty}</p>
                        <p className='mb-1'>${(item.price * item.qty)}</p>
                      </div>
                    </div>
                  ))
                }
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-1 text-start'>Total Items</p>
                    <p className='mb-1 text-end'>{totalItem}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-1 text-start'>Total Price</p>
                    <p className='mb-1 text-end fw-bold'>USD {Math.round((totalPrice + Number.EPSILON) * 100) / 100}</p>
                </div>
              </div>
              <button className="btn btn-primary mt-2" onClick={() => dispatch(checkout())}>Checkout</button>
            </div>
          </div>
        ) : ''}
        
      </div>
    </>
    
  )
}

export default Cart;