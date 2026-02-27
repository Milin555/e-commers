import React, { useState, useEffect } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { COLOR_MAP } from './ColorMap'
import { Stars } from './Stars'
import { ProductDescription } from './ProductDescription'
import { SimilarProducts } from './SimilarProducts'

export const ProductDetail = () => {
  const { product, products, categories } = useLoaderData();

  const thumbs = product?.thumbnail
    ? [product.thumbnail, product.thumbnail, product.thumbnail]
    : [];

  const [mainImage, setMainImage] = useState(product?.thumbnail);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    setMainImage(product?.thumbnail);
    setSelectedSize(null);
    setSelectedColor(null);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const similar = products
    ?.filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen">


      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col lg:flex-row gap-6 md:gap-10">

        {/* LEFT — Image Gallery */}
        <div className="w-full lg:w-[55%] flex gap-3 md:gap-4">
          <div className="hidden sm:flex flex-col gap-3 w-[60px] md:w-[80px] shrink-0">
            {thumbs.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`rounded-xl overflow-hidden border-2 transition-all duration-200 w-[56px] md:w-[72px] h-[70px] md:h-[90px] bg-gray-50 ${
                  mainImage === img
                    ? 'border-black shadow-md'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
          <div className="flex-1 rounded-2xl bg-[#F4F4F5] overflow-hidden flex items-center justify-center" style={{ minHeight: '300px' }}>
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[300px] md:h-[520px] object-contain transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* RIGHT — Product Info */}
        <div className="w-full lg:w-[45%] flex flex-col gap-5 py-2">

          {/* Breadcrumb */}
          {(() => {
            const category = categories?.find(c => c.id === product.category_id);
            const typeName = category?.categoryTypes?.find(t => (t.type_id || t.id) === product.type_id)?.name || '';
            return (
              <div className="text-sm text-gray-400 flex gap-2 items-center">
                <Link to="/" className="hover:text-gray-700 transition-colors">Shop</Link>
                <span>›</span>
                <Link to={category?.path || '/'} className="hover:text-gray-700 transition-colors">
                  {category?.name}
                </Link>
                <span>›</span>
                <span className="text-gray-800 font-semibold">{typeName}</span>
              </div>
            );
          })()}

          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{product.brand}</p>
          <h1 className="text-[28px] font-bold text-gray-900 leading-snug">{product.title}</h1>

          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-400">· 120 reviews</span>
          </div>

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

          <div className="flex gap-3 mt-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-800 active:scale-95 transition-all duration-200">
              <span>🛒</span> Add to cart
            </button>
            <div className="flex items-center justify-center px-5 py-3.5 bg-gray-100 rounded-xl font-bold text-gray-900 text-sm min-w-[80px]">
              {discountedPrice ? `$${discountedPrice}` : `$${product.price}`}
            </div>
          </div>

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

      <ProductDescription description={product.description} />
      <SimilarProducts products={similar} />

    </div>
  );
};
