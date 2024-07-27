import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../../redux/slices/WishlistSlice'
import { addToCart } from '../../redux/slices/CartSlice'


function Wishlist() {

    const [wishlistData, setWishlist] = useState([])

    const { wishlist } = useSelector((state) => state.WishlistSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        setWishlist(JSON.parse(localStorage.getItem('wishlist')))
    }, [wishlist])

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        dispatch(removeFromWishlist(item.id))
    }

    return (
        <section style={{ backgroundColor: "#eee" }}>

            {wishlistData.length > 0 ?
                <div className="container py-5">
                    <div className="row justify-content-center mb-3">
                        {wishlistData.map((item) => (
                            <div className="col-md-12 col-xl-10 mb-2" key={item.id}>
                                <div className="card shadow-0 border rounded-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                <Link to={'/product/1'}>
                                                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                        <img
                                                            src={item?.thumbnail}
                                                            className="w-100"
                                                        />

                                                        <div className="hover-overlay" >
                                                            <div
                                                                className="mask"
                                                                style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                                                            />
                                                        </div>

                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-xl-6">
                                                <h5>{item.title}</h5>
                                                <p className=" mb-4 mb-md-0">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                <div className="d-flex flex-row align-items-center mb-1">
                                                    <h4 className="mb-1 me-1">$ {item.price}</h4>
                                                    <span className="text-danger">
                                                        <s>${Math.round(item.price + 5)}</s>
                                                    </span>
                                                </div>
                                                <div className="d-flex flex-column mt-4">
                                                    <button
                                                        onClick={() => dispatch(removeFromWishlist(item.id))}
                                                        className="btn btn-primary btn-sm"
                                                        type="button"
                                                    >
                                                        Remove
                                                    </button>
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        data-mdb-button-init=""
                                                        data-mdb-ripple-init=""
                                                        className="btn btn-outline-primary btn-sm mt-2"
                                                        type="button"
                                                    >
                                                        Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div>
                    Nothing in wishlistData
                </div>
            }
        </section>

    )
}

export default Wishlist