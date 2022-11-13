import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FiLogIn,
    FiLogOut,
    FiShoppingCart,
    FiHome,
    FiShoppingBag,
    FiDollarSign
} from "react-icons/fi";
import { logout } from "../redux/reducer/handleAuth";


const Navbar = () => {
    const dispatch = useDispatch();
    const loginInfo = (JSON.parse(localStorage.getItem("login")) || {});
    const navigate = useNavigate();
    console.log('loginInfo ', loginInfo)

    const handleLogout = () => {
        dispatch(logout())
        .unwrap()
        .then(() => {
            window.location.reload()
        })
    }
    // const state = useSelector((state) => state.handleCart)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container d-flex justify-content-between">
                    <a className="navbar-brand" >G-SHOP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav container d-flex justify-content-center align-items-center gap-5">
                        {loginInfo.isadmin == true ? (
                            <>
                                <NavLink className="text-reset text-decoration-none d-flex align-items-center" to="/update">
                                    <FiShoppingBag />&nbsp;Update Product
                                </NavLink> 
                                <NavLink className="text-reset text-decoration-none d-flex align-items-center" to="/rekap">
                                    <FiDollarSign />&nbsp;Rekap
                                </NavLink> 
                            </>
                        ) : (
                            <>
                                <NavLink className="text-reset text-decoration-none d-flex align-items-center" to="/">
                                    <FiHome />&nbsp;Home
                                </NavLink> 
                                <NavLink className="text-reset text-decoration-none d-flex align-items-center" to={loginInfo === null ? "/login" : "/cart"}>
                                    <FiShoppingCart/>&nbsp;Cart
                                </NavLink> 
                            </>
                        )}
                            
                        </div>
                    </div>
                    { loginInfo.username !== undefined ? 
                    (
                        <button component={NavLink} className="btn btn-outline-dark" tabindex="-1" role="button" aria-disabled="true" onClick={() => {
                            handleLogout()
                            if(loginInfo.isadmin === true) {
                                navigate('/login')
                            }
                        }}>
                            <FiLogOut />
                            &nbsp;Logout
                        </button>
                    ) :
                    (
                        <button component={NavLink} className="btn btn-dark" role="button" aria-disabled="true" onClick={() => navigate('/login')}>
                            <FiLogIn />
                            &nbsp;Login
                        </button>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;