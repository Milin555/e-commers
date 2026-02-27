import React from 'react'
import SvgFavourite from '../components/common/SvgFavourite'
import { Link } from 'react-router-dom'

export const ProductcardPage = ({ id, title, price, discount, brand, thumbnail }) => {
  const salePrice = discount
    ? (price - (price * discount) / 100).toFixed(2)
    : null;

  return (
    <div className="w-full h-auto cursor-pointer group">
      <div className="relative h-[220px] sm:h-[280px] md:h-[340px] w-full mb-3 overflow-hidden rounded-2xl bg-gray-100">
        <Link to={`/product/${id}`}>
          <img
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={thumbnail}
            alt={title}
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white rounded-full p-1 md:p-1.5 shadow-sm cursor-pointer hover:scale-110 transition-transform">
          <SvgFavourite />
        </div>
      </div>

      <div className="flex justify-between items-start px-1">
        <div className="flex flex-col min-w-0 flex-1">
          <p className="text-[13px] md:text-[15px] font-bold text-gray-900 leading-tight mb-0.5 truncate">{title}</p>
          <p className="text-[11px] md:text-[12px] text-gray-400 font-medium">{brand}'s Brand</p>
        </div>
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <span className="text-[13px] md:text-[15px] font-bold text-gray-900">${salePrice ?? price}</span>
          {salePrice && (
            <span className="text-[10px] md:text-[12px] line-through text-gray-400">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};
