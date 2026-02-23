import React from 'react'
import { Link } from 'react-router-dom'

export const SimilarProducts = ({ products }) => {
  if (!products?.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-1 h-5 bg-black rounded-full inline-block"></span>
        Similar Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map(p => {
          const salePrice = p.discount
            ? (p.price - (p.price * p.discount) / 100).toFixed(2)
            : null;
          return (
            <Link key={p.id} to={`/product/${p.id}`} className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-3" style={{ height: '260px' }}>
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition-colors text-sm">♡</div>
              </div>
              <p className="text-sm font-bold text-gray-900 truncate">{p.title}</p>
              <p className="text-xs text-gray-400 mb-1">{p.brand}'s Brand</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">${salePrice ?? p.price}</span>
                {salePrice && <span className="text-xs line-through text-gray-400">${p.price}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
