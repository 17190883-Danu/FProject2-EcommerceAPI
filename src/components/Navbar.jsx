import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const state = useSelector((state) => state.handleCart)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" >G-SHOP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        <NavLink className="btn btn-outline-dark" href="/kart"><i className="fa fa-shopping-cart me-1">
                            </i>Cart ({state.length})
                        </NavLink> 
                        <a className="btn btn-outline-dark" href="/login"><i className="fa fa-sign-in me-1"></i>Login</a> 
                        {/* <a className="nav-link disabled">Disabled</a> */}
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;