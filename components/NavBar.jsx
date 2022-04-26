import React from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {Cart} from './';
import { useStateContext } from '../context/StateContext';

const NavBar = () => {
  const {showCart, setShowCart,totalQuantites} = useStateContext(); 

  return (
    <div className='navbar-container'> 
      <p className='logo'></p>
      <p>
        <Link href="/"> El Electronics</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
          <AiOutlineShoppingCart/>
          <span className='cart-iten-qty'>{totalQuantites}</span>
      </button>
      {showCart && <Cart/> }
    </div>
  )
}

export default NavBar