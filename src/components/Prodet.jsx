import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {
  fetchOneProduct,
  addToCart
} from '../redux/reducer/handleCart';
import Skeleton from "react-loading-skeleton";

const Prodet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector(state => state.cart.products)
  const productState = useSelector(state => state.cart)

  const {id} = useParams();

  // console.log('productData', productData)

  useEffect(() => {
    dispatch(fetchOneProduct(id));
  }, [])

  const checkLoginOnCart = (id, stock, name) => {
    if(localStorage.getItem("login") === null) {
        navigate('/login')
    } else {
        if(stock > 0) {
            dispatch(addToCart(id));
            alert(`Item ${name} have successfully added to cart`);
        }
    }
  }

    // useEffect(() => {
    //     const getProdet = async () => {
    //       setLoading(true);
    //       const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    //       setProdet(await response.json());
    //       setLoading(false);
    //     }
    //     getProdet();
    // }, []);

    const Loading = () => {
      return(
          <>
              <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={50} width={300}/>
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150}/>
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100}/>
                    <Skeleton height={50} width={100} style={{marginLeft:6}
                    }/>
                </div>
          </>
      );
  };

  const ShowProduct = () => {
    {
      
    }
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row">
        {productState.isPending ? <Loading/> : (
          productData.map((prodet, index) => (
          <>
            <div className="col-md-6">
              <img src={prodet.image} alt={prodet.title} 
              height="400px" width="400px" />
            </div>
              <div className="col-md-6">
                <h4 className='text-uppercase text-black-50'>
                  {prodet.category}
                </h4>
                <h1 className='display-5'>{prodet.title}</h1>
                <p className='lead fw-bolder'>
                  Rating {prodet.rating && prodet.rating.rate}
                  <i className='fa fa-star'></i>
                </p>
                <h3 className='display-6 fw-bold my-4'>
                  ${prodet.price}
                </h3>
                <p className='lead'>{prodet.description}</p>
                <button className='btn btn-outline-dark px-4 py-2'
                onClick={() => checkLoginOnCart(prodet.id, prodet.stock, prodet.title)}>
                  Add to Cart
                </button>
              </div>
          </>
          ))
        )}
        </div>
      </div>
    </div>
  )
}

export default Prodet;