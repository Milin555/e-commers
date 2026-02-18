import React from 'react'
import SvgFavourite from '../components/common/SvgFavourite'

export const ProductcardPage = ({title,description,price,discount,rating,brand,thumbnail}) => {
  return (
    <div className="w-[275px] h-auto cursor-pointer group">
      <div className="relative h-[370px] w-full mb-3 overflow-hidden rounded-2xl">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={thumbnail}
          alt={title}
        />
        <div className="absolute top-4 right-4 bg-white rounded-full p-1.5 shadow-sm cursor-pointer hover:scale-110 transition-transform">
           <SvgFavourite />
        </div>
      </div>
      
      <div className="flex justify-between items-start px-1">
        <div className='flex flex-col'>
          <p className='text-[18px] font-bold text-gray-900 leading-tight mb-1 truncate w-[180px]'>{title}</p>
          <p className='text-[14px] text-gray-500 font-medium'>{brand}'s Brand</p>
        </div>
        <div className="bg-gray-100 rounded-lg px-3 py-1.5 flex items-center justify-center">
            <span className="text-[14px] font-bold text-gray-900">${price}</span>
        </div>
      </div>
    </div>
  )
}
