import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { productSearch } from '../../redux/slices/ProductSlice'

function Header() {
  const [wishCount, setWishcount] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const dispatch = useDispatch()

  const wishlist = useSelector((state) => state.WishlistSlice)
  const { cartlist } = useSelector((state) => state.CartSlice)
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('wishlist'))) {
      setWishcount(JSON.parse(localStorage.getItem('wishlist')).length)
    }
    setCartCount(cartlist.length)
  }, [wishlist, cartlist])
  return (
    <>
      <Navbar expand="lg" sticky="top" className="bg-primary">
        <Container>
          <Navbar.Brand>Cartilot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="d-flex">
                <input onChange={(e) => dispatch(productSearch(e.target.value.toLowerCase()))} className="form-control me-sm-2 " type="search" placeholder="Search" />
              </div>
              <Link
                to={'/wish-list'}
                className='border border-dark border-2 rounded p-2 me-md-2 me-sm-0 text-decoration-none text-black'
              >
                <i className="fa-solid fa-heart" style={{ color: "#ff0000" }} /> Wishlist
                <span className='badge bg-secondary ms-2'>{wishCount}</span>
              </Link>
              <Link
                to={'/cart'}
                className='border border-dark border-2 rounded p-2 ms-md-2 ms-sm-0 text-decoration-none text-black'
              >
                <i className="fa-solid fa-cart-shopping" style={{ color: "#39FF14" }} /> Cart
                <span className='badge bg-secondary ms-2'>{cartCount}</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
