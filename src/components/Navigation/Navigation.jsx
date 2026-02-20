import React, { useState } from 'react'
import { Wishlist } from '../common/Wishlist'
import { CartIcon } from '../common/Carticons'
import { AccountIcon } from '../common/Accounticons'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.css'

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
     <nav className="flex flex-wrap items-center py-4 px-4 md:px-16 justify-between gap-4 md:gap-10">
      
      <div className="flex items-center gap-6">
        <a className="text-2xl md:text-3xl text-black font-bold" href="/">
          ShopEase
        </a>
      </div>

      {/* Hamburger for mobile */}
      <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-wrap items-center gap-6 md:gap-10 flex-1 w-full md:w-auto`}>
        <ul className="flex flex-col md:flex-row gap-4 md:gap-14 text-gray-600 w-full md:w-auto">
          <li className='hover:text-black'><NavLink to="/" className={({isActive})=> isActive ? 'active-link':''}>Shop</NavLink></li>
          <li className='hover:text-black'><NavLink to="/men" className={({isActive})=> isActive ? 'active-link':''}>Men</NavLink></li>
          <li className='hover:text-black'><NavLink to="/women" className={({isActive})=> isActive ? 'active-link':''}>Women</NavLink></li>
          <li className='hover:text-black'><NavLink to="/kids" className={({isActive})=> isActive ? 'active-link':''}>Kids</NavLink></li>
        </ul>
      </div>

      <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex justify-center w-full md:w-auto`}>
        <div className="border rounded flex overflow-hidden w-full md:w-auto">
            <button className='flex items-center justify-center px-4 border-l'>
          <svg className="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
            <input type="text" className="px-4 py-2 outline-none w-full" placeholder="Search"/>
            </button>
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <ul className='flex items-center gap-4'>
              <li><button><Wishlist /></button></li>
              <li><button><AccountIcon /></button></li>
              <li><NavLink to='/cart-items'><CartIcon /></NavLink></li>
        </ul>
      </div>

    </nav>
  )
}
