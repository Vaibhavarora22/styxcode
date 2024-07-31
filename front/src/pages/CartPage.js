import React, { useEffect, useState } from 'react'
import { useCart } from "../context/cart";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../styles/CartStyles.css";
import Header from './Header';

const CartPage = () => {
    const [cart , setCart] = useCart();
    

    //total price
    const totalPrice = () => {
        try {
        let total = 0;
        cart?.map((item) => {
            total = total + item.price;
        });
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
        } catch (error) {
        console.log(error);
        }
    };

    //delete item
    const removeCartItem = (pid) => {
        try {
          let myCart = [...cart];
          let index = myCart.findIndex((item) => item._id === pid);
          myCart.splice(index, 1);
          setCart(myCart);
          localStorage.setItem("cart", JSON.stringify(myCart));
        } 
        catch (error) {
          console.log(error);
        }
    };



  return (
    <>
        <Header />
        <div className='cart-page'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className="text-center bg-light p-2 mb-1">
                        <i className="fa fa-shopping-cart"></i> My Cart
                        <p className="text-center">
                            {cart?.length
                            ? `You Have ${cart.length} items in your cart` 
                            : " Your Cart Is Empty"}
                        </p>
                    </h1>
                </div>
                
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-7 p-0 m-0'>
                        {
                            cart?.map((p) => (
                            <div className='row card flex-row' key={p._id}>
                                <div className='col-md-4'>
                                    <img className="card-img-top" src= {`/api/v1/product/product-photo/${p._id}`}  alt={p.name} width="100px" height={'130px'}/>

                                </div>
                                <div className='col-md-4'>
                                    <p>{p.name}</p>
                                    <p> {p.description.substring(0,30)}</p>
                                    <p>Price : {p.price}</p>
                                </div>
                                <div className="col-md-4 cart-remove-btn">
                                    <button className="btn btn-danger" onClick={() => removeCartItem(p._id)} >
                                        Remove
                                    </button>
                                </div>

                                    
                                    
                            
                            </div> 
                            ))
                        }
                    </div>
                    <div className='col-md-5 cart-summary'>
                        <h2> Cart Summary </h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4> Total : {totalPrice()}</h4>
                        <h4> ADDRESS </h4>
                        
                    </div>

                </div>
            </div>
            
        </div>
    </>
  )
}

export default CartPage