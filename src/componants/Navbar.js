import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  let location = useLocation();
  let history = useNavigate()
  const handleSignOut = () => {
    localStorage.removeItem("token")
    history("/signin");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? <form className="d-flex mx-2">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="btn btn-primary  nav-link mt-1 mx-1 active" to="/signin" role="button">SignIn</Link>
            </li>
            <li className="nav-item">
            <Link className="btn btn-primary mt-1  mx-1 nav-link active" to="/signup" role="button">SignUp</Link>
            </li>
            </ul>
          </form> :
            <form className="d-flex mx-2">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary nav-link active" onClick={handleSignOut}>SignOut</button>
                </li>
              </ul>
            </form>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
