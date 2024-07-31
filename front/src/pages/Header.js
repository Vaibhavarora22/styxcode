import React from "react";
import { NavLink, Link } from "react-router-dom";
import toast from "react-hot-toast";
import SearchInput from "../context/SearchInput";
import { useCart } from "../context/cart";
import {Badge} from 'antd';

const Header = () => {
  const [cart ] = useCart();
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div className="ml-2 ">
                 <SearchInput />
              </div>
              
              <li className="nav-item  ">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              
                
              <li className="nav-item">
              <Badge count={cart?.length} showZero>
                {/* <Avatar shape="square" size="large" /> */}
                <NavLink to="/cart" className="nav-link">
                  Cart 
                </NavLink>
              </Badge>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;