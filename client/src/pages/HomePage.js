import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import dress1 from '../images/dress1.jpg'
import dress4 from '../images/dress4.jpg'
import shirt1 from '../images/shirt1.webp'
import shirt2 from '../images/shirt2.webp'
import pent1 from '../images/pent1.jpg'
import shirt3 from '../images/shirt3.avif'
import coat1 from '../images/coat1.jpg'

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl ucts - Best offers "}>
      <section className="home">
        {/* banner image */}
        <div div id="carouselExample" class="carousel slide" >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={dress1} class="d-block w-100" alt="Banner" />
              <div class="carousel-caption d-none d-md-block">
                <a className="text-dark btn btn-primary" href='#products'><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
            <div class="carousel-item">
              <img src={dress4} class="d-block w-100" alt="Banner" />
              <div class="carousel-caption d-none d-md-block">
                <a className="text-dark btn btn-primary" href='#products'> <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div >
        {/* banner image */}
        {/* Featured */}

        <div className="container">
        <h3 className='text-center fw-bold'>PRODUCTS YOU MAY LIKE </h3>
        <p className='text-center fs-3 text-secondary g-0 lh-1' style={{ fontFamily: "'Dongle', sans-serif" }}>Suspendisse varius enim in eros elementum tristique.Duis cursus,mi quis viverra <br /> ornare,eros dolor interdum nulla.</p>
        <div className="container text-center">
          <div className="row mb-5">
            <div className="col-md-4">
              <div className="card">
                <img src={shirt1} className="img-fluid w-100" alt="sofa2" />
                <h6 className='fw-bold'>Bly Microfiber / Microsuede 56" Armless Loveseat</h6>
                <h5 className='text-danger fw-bold pt-2'>$367</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={pent1} className="img-fluid w-100" alt="sofa2" />
                <h6 className='fw-bold'>Bly Microfiber / Microsuede 56" Armless Loveseat</h6>
                <h5 className='text-danger fw-bold pt-2'>$367</h5></div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={shirt1} className="img-fluid w-100 " alt="sofa2" />
                <h6 className='fw-bold'>Bly Microfiber / Microsuede 56" Armless Loveseat</h6>
                <h5 className='text-danger fw-bold pt-2'>$367</h5></div>
            </div>
          </div>
          <a href="https://enzahome.pk/products/eh-itm000468?variant=44681297363219">
            <button className='btn rounded-0 fw-bold px-4 py-2 mb-5' style={{ color: "blue", borderColor: "blue" }}>DISCOVER MORE</button>
          </a>
        </div>
      </div>
        <section className="featured">
          <div className="container-fluid row mt-3 bg-light py-5" >
            <div className="col-12" style={{ fontFamily: "'Dongle', sans-serif"}}>
              <h1 className="text-center text-dark" style={{ fontFamily: "'Dongle', sans-serif",fontSize:50}}>Featured Products</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2 col-md-3 rounded-0 mx-5" key={p._id}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
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
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price mb-1 pb-0">
                        <button
                          className="btn btn-info btn-sm ms-1 w-50"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-dark btn-sm w-50 ms-1"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Featured */}
        <div className="container-fluid row mt-3 home-page mb-0"   >
          <div className="col-md-3 filters">
            <h4 className="text-center text-dark">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4 text-dark">Filter By Price</h4>
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
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9 ">
            <h1 id="products" className="text-center text-dark" style={{ fontFamily: "'Dongle', sans-serif",fontSize:50}}>All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
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
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1 btn-sm"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-dark ms-1 btn-sm"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
