import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../../redux/slices/WishlistSlice'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/CartSlice'

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const findProdcut = JSON.parse(localStorage.getItem('products'))
    const dispatch = useDispatch()

    useEffect(() => {
        setProduct(findProdcut.find((item) => item.id == id))
    }, [])


    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img
                                className="card-img-top mb-5 mb-md-0"
                                src={product?.thumbnail}
                                alt="img"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">ID: {product?.id}</div>
                            <h1 className="display-5 fw-bolder">{product?.title}</h1>
                            <div className="fs-5 mb-5">
                                {/* <span className="text-decoration-line-through">$45.00</span> */}
                                <span>$ {product?.price}</span>
                            </div>
                            <p className="lead">
                                {product?.description}
                            </p>
                            <div className="d-flex">
                                <span className='m-2'>Quantity:</span>
                                <input
                                    className="form-control text-center me-3"
                                    id="inputQuantity"
                                    type="num"
                                    defaultValue={1}
                                    style={{ maxWidth: "3rem" }}
                                />
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                                <button
                                    className="btn btn-danger flex-shrink-0"
                                    type="button"
                                    onClick={() => dispatch(addToWishlist(product))}
                                >
                                    <i className="bi-cart-fill me-1" />
                                    Add to Wishlist
                                </button>
                                <button
                                    className="btn btn-success flex-shrink-0"
                                    type="button"
                                    onClick={() => { dispatch(addToCart(product)) }}
                                >
                                    <i className="bi-cart-fill me-1" />
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Product