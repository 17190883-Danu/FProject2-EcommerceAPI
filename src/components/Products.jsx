import React, {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";
// import { addCart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router';
import { fetchProducts, addToCart } from "../redux/reducer/handleCart";
import { FiShoppingCart } from "react-icons/fi";

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    const allProducts =  useSelector((state) => state.cart.products);
    const stateProducst = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    // console.log('allProducts', allProducts)

    // useEffect(() => {
    // const getProducts = async () => {
    //     setLoading(true);
    //     const response = await fetch("https://fakestoreapi.com/products");
    //     if(componentMounted){
    //         setData(await response.clone().json());
    //         setFilter(await response.json());
    //         setLoading(false);
    //         console.log(filter);
    //     }
    //     return() => {
    //         componentMounted = false;
    //     }
    // }
    //  getProducts();   
    // }, []);

    const Loading = () => {
        return(
            <>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        );
    };

    // const filterProduct = (cat) => {
    //     const updatedList = data.filter((x)=>x.category === cat);
    //     setFilter(updatedList);
    // }

    // const ShowProducts = () => {
    //     return (
    //         <>
    //     <div className="buttons d-flex justify-content-center mb-5 pb-5">
    //         <button className="btn btn-outline-dark me-2" onClick={() =>setFilter(data)}>All</button>
    //         <button className="btn btn-outline-dark me-2" onClick={() =>filterProduct("men's clothing")}>Men's</button>
    //         <button className="btn btn-outline-dark me-2" onClick={() =>filterProduct("women's clothing")}>Women's</button>
    //         <button className="btn btn-outline-dark me-2" onClick={() =>filterProduct("jewelery")}>Jewelery</button>
    //         <button className="btn btn-outline-dark me-2" onClick={() =>filterProduct("electronics")}>Electronic</button>
    //     </div>
    //     {filter.map((product) => {
    //         return(
    //             <>
    //                 <div className="col-md-3 mb-4">
    //                 <div className="card h-100 text-center p-4" key={product.id}>
    //                 <img src={product.image} className="card-img-top" alt=
    //                 {product.title} height="250px" />
    //                 <div className="card-body">
    //                     <h5 className="card-title mb-0">{product.title.substring(0,
    //                         12)}</h5>
    //                     <p className="card-text lead fw-bold">
    //                         ${product.price}
    //                     </p>
    //                     <NavLink to={`/${product.id}`} className="btn btn-primary">
    //                         Detail
    //                     </NavLink>
    //                     <button className='btn btn-primary'>
    //                         Add to Cart
    //                      </button>
    //                 </div>
    //                 </div>
    //                 </div>
    //             </>
    //         )
    //     })}
    //         </>
    //     );
    // };

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

    console.log('allproducts', allProducts)

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Produkku</h1>
                        <hr/>
                    </div>
                </div>
                    <div className="row justify-content-center">
                        {
                            allProducts.map((item, index) => (
                                <div className="col-md-3 mb-4">
                                    <div className="card h-100 text-center p-4" key={item.id}>
                                        <img src={item.image} className="card-img-top" alt=
                                        {item.title} height="250px" />
                                        <div className="card-body d-flex justify-content-between flex-column">
                                            <h5 className="card-title mb-0">{item.title}</h5>
                                            <p className="card-text lead fw-bold">
                                                ${item.price}
                                            </p>
                                            <div className="d-flex justify-content-between gap-1">
                                                <Link to={`/product/${item.id}`} className="btn btn-primary w-100">
                                                    Detail
                                                </Link>
                                                <button className='btn btn-outline-primary w-50' onClick={() => checkLoginOnCart(item.id, item.stock, item.title)}>
                                                    <FiShoppingCart />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* {loading ? <Loading/> : <ShowProducts/>} */}
            </div>
        </div>
    );
}

export default Products;