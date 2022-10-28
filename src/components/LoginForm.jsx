import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLoginAPI } from "../redux/reducer/handleAuth";
import landingImage from '../assets/Login_Image.svg'
import backgroundImage from '../assets/Background_Login.svg'
import { FiArrowLeft } from "react-icons/fi";

function LoginForm() {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    const login = {email, password}
    dispatch(authLoginAPI({email, password}))
    .unwrap()
    .then(() => {
      // handleRedirectToHome()
      navigate('/')
      window.location.reload()
    })
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div className="vh-100 vw-100 d-flex bg-blue-pastel justify-content-center" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <div className="w-auto m-auto bg-white shadow-lg rounded-4 d-flex flex-row justify-content-between">
        {error !== "" ? <div className="error">{error}</div> : ""}
        <form onSubmit={submitHandler} className='d-flex justify-content-center align-items-center flex-column w-50 px-5 position-relative'>
          <Link to='/' className="align-self-start position-absolute top-0 pt-5 text-decoration-none d-flex align-items-center text-reset"><FiArrowLeft size={28} />&nbsp;<span className="text-decoration-underline">Back To Home</span></Link>
          <h1 className="text-center mb-1 fs-1 fw-bold">
            Sign In
          </h1>
          <span className="mb-5">Masuk dan mulailah roleplay menjadi orang kaya</span>
          <div className="mb-3 w-100">
            <label htmlFor="Email" className='form-label'>Username</label><br/>
            <div className="input-group">
              <input type="email" name="email" id="Email" className="form-control rounded-md py-2"
              placeholder="Your Email"
              onChange={emailChange}
              value={email}
              />
              <span className="input-group-text">@</span>
            </div>
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className='form-label'>Password</label><br/>
            <input
              type="password"
              className="form-control rounded-md py-2"
              id="password"
              placeholder="Your Password"
              onChange={passwordChange}
              value={password}
            />
          </div>

          <div className="d-flex justify-content-center items-center gap-3 mt-1 w-100">
            <input
              type="submit"
              className={`btn btn-primary py-2 px-4
                ${loginState.isLoginPending ? " Disabled" : ''}
              `}
              value={`${loginState.isLoginPending ? "Logging In" : (loginState.isLoginSuccess ? "Logged In" : "Login")}`}
              disabled={loginState.isLoginPending}
              />
          </div>
              {loginState.errorMessage && <div className="text-danger">{loginState.errorMessage}</div>}
        </form>
        <object data={landingImage} alt="landingImage" className="w-auto h-100 rounded-3"  style={{objectFit: 'cover', backgroundRepeat: 'no-repeat', imageRendering: 'smooth'}}></object>
      </div>
    </div>
  );
}

export default LoginForm;