import React, {  useEffect, useState } from "react";
//import Layout from "./../components/Layout/Layout";
import axios from "axios";
import {  Radio } from "antd";
import { Prices } from "../Routes/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import Header from "./Header.js";
import "../styles/HomePage.css";

const HomePage = () => {
  
  const [products , setProducts] = useState([]);
  const [checked , setChecked] = useState([]);
  const [radio , setRadio] = useState([]);
  const[total , setTotal] = useState(0);
  const [page , setPage] = useState(1);
  const [loading , setLoading] = useState(false);
  const [cart , setCart] = useCart();

  const navigate = useNavigate();

  //lifecycle method
  useEffect(() => {
    getTotal();
  } , []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      console.log("hello");
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      console.log(data.products);
      setLoading(false);
      setProducts(data?.products || []);
    } 
    catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  
  //get Total COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } 
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  //lifecycle method
  useEffect(() => {
    console.log("abc");
    if (!checked.length || !radio.length) {
      console.log("abc");
      getAllProducts();
    }
  }, [checked.length, radio.length]);
  
  
  

  //get filtered products
  const filterProduct = async () => {
    try{
      const {data} = await axios.post('/api/v1/product/product-filters' , { radio});
      setProducts(data?.products);
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    if ( radio.length) {
      filterProduct();
    }
  }, [radio]);

  
  

  
  return (

    
    <div>
      <Header />
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="conatiner-fluid row mt-3 home-page">
        <div className="col-md-2 filters">

          

          {/* price filter */}

          <h4 className="text-center mt-4"> Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
              
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
                <button className="btn btn-danger" onClick={() => window.location.reload()}> RESET FILTERS</button>
          </div>
          
        </div>
        <div className="col-md-9 offset-1">
          
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map ((p) => (
              <div className="card m-2" style={{width: '18rem'}}>
                  <img className="card-img-top" src= {`/api/v1/product/product-photo/${p._id}`}  alt={p.name} />
                  <div className="card-body">
                    <div className="card-name-price">

                      <h5 className="card-title">{p.name}</h5>
                    
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                  </div>
                  <p className="card-text">{p.description.substring(0 , 30)}...</p>
                  <div className="card-name-price">
                  
                      <button className="btn btn-info ms-1" onClick={() => {
                        navigate(`/product/${p.slug}`)

                      }}> More Details</button>
                      <button className="btn btn-dark ms-1" onClick={() => {
                        setCart([...cart,p])
                        localStorage.setItem('cart' , JSON.stringify([...cart] , p))
                        toast.success('Item Added to cart')
                      }}> ADD TO CART</button>
                                    
                  </div>
              </div>
                        
                    
            ))};
          </div> 
          <div className="m-2 p-3">
            {products && products.length <total && (
              <button className="btn loadmore" onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading ... " : (
                  <>
                    {" "}
                    loadmore <AiOutlineReload />
                  </>
                  

                )}
              </button>
            )}
          </div>  
        </div>
      </div>
    </div>
  );
};

export default HomePage;