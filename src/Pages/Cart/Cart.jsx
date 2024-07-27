import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { removeFromCart, emptyCart, addToCart, decreaceQuantity } from '../../redux/slices/CartSlice'
import { useDispatch } from 'react-redux'

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartlist = useSelector((state) => state.CartSlice.cartlist)

  const handleCheckOut = () => {
    dispatch(emptyCart())
    navigate('/')
  }

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">

        {cartlist?.length > 0 ?
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cartlist && cartlist.length} items</h5>
                </div>
                {cartlist?.map((item, index) => (
                  <div className="card-body" key={index + 1}>
                    <div className="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={item.thumbnail}
                            className="w-100"
                            alt="Blue Jeans Jacket"
                          />
                          <Link>
                            <div
                              className="mask"
                              style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                        <p>
                          {item.description}
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        {/* Quantity */}
                        <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                          <button className="btn btn-primary px-3 me-2" onClick={() => { dispatch(decreaceQuantity(item)) }} >
                            <i className="fas fa-minus" />
                          </button>
                          <div className="form-outline">
                            <input
                              name="quantity"
                              value={item.quantity}
                              type="text"
                              readOnly
                              style={{ maxWidth: "4rem" }}
                              className="form-control text-center"
                            />
                          </div>
                          <button className="btn btn-primary px-3 ms-2" onClick={() => { dispatch(addToCart(item)) }} >
                            <i className="fas fa-plus" />
                          </button>
                        </div>

                        <p className="text-start text-md-center">
                          <strong>$ {item.quantity * item.price}</strong>
                        </p>
                        <p>
                          <button className='btn' style={{ backgroundColor: 'red' }} onClick={() => { dispatch(removeFromCart(item.id)) }}>
                            <i className="fa-solid fa-trash" style={{ color: "#fcfcfc", }} />
                          </button>
                        </p>
                      </div>
                    </div>
                    <hr className="my-5" />

                  </div>
                ))}
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body">
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                    alt="PayPal acceptance mark"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Products
                      <span> {cartlist && cartlist.length} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Total Price
                      <span>$ {Math.ceil(cartlist.reduce((prev, item) => prev + (item.quantity * item.price), 0))}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>$ {Math.ceil(cartlist.reduce((prev, item) => prev + (item.quantity * item.price), 0))}</strong>
                      </span>
                    </li>
                  </ul>
                  <div className='d-grid'>
                    <button
                      onClick={() => { handleCheckOut() }}
                      type="button"
                      className="btn btn-primary btn-lg "
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <h3 className='text-center'>Cart Empty</h3>
        }
      </div>
    </section>

  )
}

export default Cart