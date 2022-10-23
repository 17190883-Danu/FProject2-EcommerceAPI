import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";

const Prodet = () => {

    const {id} = useParams();
    const [prodet, setProdet] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProdet = (prodet) => {
      dispatch(addCart(prodet));
    }

    useEffect(() => {
        const getProdet = async () => {
          setLoading(true);
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          setProdet(await response.json());
          setLoading(false);
        }
        getProdet();
    }, []);

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
    return(
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
            onClick={()=>addProdet(prodet)}>
              Add to Cart
            </button>
          </div>
      </>
    )
  }

  return (
    <div>
      <div className="container">
        <div className="row">
        {loading ? <Loading/> : <ShowProduct/>}
        </div>
      </div>
    </div>
  )
}

export default Prodet;