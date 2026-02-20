import React, { useState, useEffect } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import content from '../../data/Content.json'

/* ── colour name → css background map ── */
const COLOR_MAP = {
  Black: '#111111', White: '#FFFFFF', Purple: '#7C3AED',
  Gray: '#9CA3AF', Grey: '#9CA3AF', Blue: '#3B82F6',
  Red: '#EF4444', Orange: '#F97316', Navy: '#1E3A5F',
  Yellow: '#FACC15', Pink: '#EC4899', Green: '#22C55E',
  Beige: '#D4B896',
};

/* ── star row ── */
const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <span key={s} className={`text-base ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
    ))}
  </div>
);

export const ProductDetail = () => {
  const { product } = useLoaderData();

  const thumbs = product?.thumbnail
    ? [product.thumbnail, product.thumbnail, product.thumbnail]
    : [];

  const [mainImage, setMainImage]     = useState(product?.thumbnail);
  const [selectedSize, setSelectedSize]   = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  /* Reset state when navigating to a different product (e.g. Similar Products) */
  useEffect(() => {
    setMainImage(product?.thumbnail);
    setSelectedSize(null);
    setSelectedColor(null);
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-2xl text-gray-400">Product not found.</p>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  /* similar products = same category, different id */
  const similar = content?.products
    ?.filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 text-xs text-gray-400 flex gap-2 items-center">
        <Link to="/" className="hover:text-gray-700 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.title}</span>
      </div>

      {/* ── Main Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-10">

        {/* LEFT — image panel */}
        <div className="w-full lg:w-[55%] flex gap-4">

          {/* Thumbnail stack */}
          <div className="flex flex-col gap-3 w-[80px] shrink-0">
            {thumbs.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`rounded-xl overflow-hidden border-2 transition-all duration-200 w-[72px] h-[90px] bg-gray-50 ${
                  mainImage === img
                    ? 'border-black shadow-md'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 rounded-2xl bg-[#F4F4F5] overflow-hidden flex items-center justify-center" style={{ minHeight: '520px' }}>
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[520px] object-contain transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* RIGHT — info panel */}
        <div className="w-full lg:w-[45%] flex flex-col gap-5 py-2">

          {/* Brand */}
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{product.brand}</p>

          {/* Title */}
          <h1 className="text-[28px] font-bold text-gray-900 leading-snug">{product.title}</h1>

          {/* Rating row */}
          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-400">· 120 reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            {discountedPrice ? (
              <>
                <span className="text-3xl font-bold text-gray-900">${discountedPrice}</span>
                <span className="text-lg line-through text-gray-400">${product.price}</span>
                <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">
                  -{product.discount}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Sizes */}
          {product.size?.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-800">Select Size</p>
                <span className="text-xs text-gray-400 underline cursor-pointer hover:text-gray-700">Size Guide →</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.size.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${
                      selectedSize === s
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors — round swatches */}
          {product.color?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Colours Available
                {selectedColor && <span className="ml-2 text-gray-400 font-normal">— {selectedColor}</span>}
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.color.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    title={c}
                    style={{ backgroundColor: COLOR_MAP[c] || '#ccc' }}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === c
                        ? 'border-black scale-110 shadow-md'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart + price */}
          <div className="flex gap-3 mt-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-800 active:scale-95 transition-all duration-200">
              <span>🛒</span> Add to cart
            </button>
            <div className="flex items-center justify-center px-5 py-3.5 bg-gray-100 rounded-xl font-bold text-gray-900 text-sm min-w-[80px]">
              {discountedPrice ? `$${discountedPrice}` : `$${product.price}`}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            {[
              { icon: '🔒', text: 'Secure payment' },
              { icon: '📐', text: 'Size & Fit' },
              { icon: '🚚', text: 'Free shipping' },
              { icon: '🔄', text: 'Free Shipping & Returns' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-base">{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product Description ── */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <span className="w-1 h-5 bg-black rounded-full inline-block"></span>
          Product Description
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-2xl">{product.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Fabric', value: 'Bio-washed Cotton' },
            { label: 'Pattern', value: 'Printed' },
            { label: 'Fit', value: 'Regular-fit' },
            { label: 'Neck', value: 'Round Neck' },
            { label: 'Sleeve', value: 'Half-sleeves' },
            { label: 'Style', value: 'Casual Wear' },
          ].map(attr => (
            <div key={attr.label} className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">{attr.label}</p>
              <p className="text-sm font-semibold text-gray-800">{attr.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Similar Products ── */}
      {similar?.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-black rounded-full inline-block"></span>
            Similar Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {similar.map(p => {
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
      )}

    </div>
  );
};
