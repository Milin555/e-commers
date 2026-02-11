import React from 'react'
import { Wishlist } from '../common/Wishlist'

export const Navigation = () => {
  return (
     <nav className="flex items-center py-6 px-16 justify-between gap-40">
      
      <div className="flex items-center gap-6">
       
        <a className="text-3xl text-black font-bold gap-8" href="/">
          ShopEase
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-10 flex-1">
       
        <ul className="flex gap-14 text-gray-600">
          <li className='hover:text-black'><a href="/shop">Shop</a></li>
          <li className='hover:text-black'><a href="/mens">Men</a></li>
          <li className='hover:text-black'><a href="/womens">Women</a></li>
          <li className='hover:text-black'><a href="/kids">Kids</a></li>
        </ul>
      </div>

      <div className="flex justify-center">
  
        <div className="border rounded flex overflow-hidden">

            <button className='flex items-center justify-center px-4 border-l'>
          <svg className="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
            <input type="text" className="px-4 py-2 outline-none" placeholder="Search"/>
            </button>
         
        </div>
      </div>
      <div className='flex flex-wrap items-center gap-5'>
        <ul className='flex items-center gap-7'>
           <li><button ><Wishlist /></button></li>
              <li>Icon2</li>
                <li>Icon3</li>
        </ul>

      </div>

    </nav>
  )
}
