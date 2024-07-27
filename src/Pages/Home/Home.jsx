import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, nextPage, prevPage } from '../../redux/slices/ProductSlice';
import './style.css';
import { addToWishlist } from '../../redux/slices/WishlistSlice';
import { addToCart } from '../../redux/slices/CartSlice';

function Home() {
  const dispatch = useDispatch();
  const { loading, products, error, currentPage, productsPerPage } = useSelector((state) => state.productSlice);

  const totalPages = products.length / productsPerPage
  const lastProductIndex = productsPerPage * currentPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const productCard = products.slice(firstProductIndex, lastProductIndex)

  const navToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(nextPage())
    }
  }
  const navToPrevPage = () => {
    if (currentPage > 1) {
      dispatch(prevPage())
    }
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);


  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src="https://png.pngtree.com/png-clipart/20211102/original/pngtree-toothpaste-ice-green-refreshing-e-commerce-banner-png-image_6912074.png" className='d-block w-100' height={'450px'} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://graphicsfamily.com/wp-content/uploads/edd/2022/06/Free-E-commerce-Product-Banner-Design-with-Green-Colors-scaled.jpg' className='w-100 d-block' height={'450px'} />
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://i.pinimg.com/736x/ff/be/28/ffbe283fbedc1dcbc49f06702f61ea92.jpg" className='d-block w-100' alt="" height={'450px'} />
        </Carousel.Item>
      </Carousel>
      <section className="py-5">
        {loading ? (
          <div className="hourglass"></div>
        ) : (
          <div>
            {products.length > 0 ? (
              <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                  {productCard.map((item) => (
                    <div className="col mb-5" key={item.id}>
                      <div className="card h-100">

                        <Link to={`/product/${item.id}`}>
                          <img
                            className="card-img-top"
                            src={item.thumbnail}
                            alt="..."
                          />
                        </Link>

                        <div className="card-body p-md-4 p-sm-0">
                          <div className="text-center">

                            <h5 className="fw-bolder">{item.title.slice(0, 12)}...</h5>

                            $ {item.price}
                          </div>
                        </div>

                        <div className="card-footer p-md-4 p-sm-0 pt-0 border-top-0 bg-transparent">
                          <div className="d-flex justify-content-between">
                            <button className="btn" onClick={() => { dispatch(addToWishlist(item)) }}>
                              <i
                                className="fa-solid fa-heart-circle-plus fa-xl"
                                style={{ color: "#ff0000" }}
                              />
                            </button>
                            <button className="btn" onClick={() => { dispatch(addToCart(item)) }}>
                              <i
                                className="fa-solid fa-cart-plus fa-xl"
                                style={{ color: "#78c2ad" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>{error}</div>
            )}
          </div>
        )}
        <div className='d-flex justify-content-center'>
          <div className=''>
            <ul className="pagination pagination-lg ">
              <li className="page-item ">
                <button className="page-link " onClick={navToPrevPage} >
                  «
                </button>
              </li>
              <li className="page-item active">
                <button className="page-link" >
                  {currentPage} of {Math.ceil(totalPages)}
                </button>
              </li>
              <li className="page-item" onClick={navToNextPage}>
                <button className="page-link" >
                  »
                </button>
              </li>
            </ul>
          </div>
        </div>

      </section>
    </>
  );
}

export default Home;