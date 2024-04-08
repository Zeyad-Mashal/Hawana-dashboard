import React from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const logOut = () => {
    localStorage.removeItem("Hawana-Logged-In");
    window.location.reload();
  };
  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <img src={logo} alt="" width={120} />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Hawana
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <Link to={"/gallary"}>معرض المنتجات</Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <Link to={"/contact"}>استلام تواصل معنا</Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={logOut}>
                  تسجيل الخروج
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
