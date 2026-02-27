import React, { useMemo, useEffect, useState } from 'react'
import FilterIcon from '../../components/common/FilterIcon'
import Categories from '../../filter/Categories';
import { PriceFilter } from '../../filter/PriceFilter';
import ColorsFilter from '../../filter/colors';
import SizeFilter from '../../filter/SizeFilter';
import { ProductcardPage } from '../ProductcardPage';
import { fetchProducts } from '../../api/fetchProducts';
import { fetchCategories } from '../../api/FecthProduct';

export const ProductListPage = ({ categoryType }) => {
  const [dbProducts, setDbProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productsRes, categoriesRes]) => {
         setDbProducts(productsRes || []);
         setDbCategories(categoriesRes || []);
      })
      .catch(err => {
         console.error("Failed to fetch data:", err);
      })
      .finally(() => {
         setIsLoading(false);
      });
  }, []);

  const categoryContent = useMemo(() => {
    return dbCategories?.find((category) => category.code === categoryType);
  }, [categoryType, dbCategories]);

  const ProductList = useMemo(() => {
    return dbProducts?.filter((product) => product?.category_id === categoryContent?.id);
  }, [categoryContent, dbProducts]);

  const categoryColors = useMemo(() => {
     const allColors = ProductList?.flatMap(p => p.color) || [];
     return Array.from(new Set(allColors));
  }, [ProductList]);
  
  const categorySizes = useMemo(() => {
     const allSizes = ProductList?.flatMap(p => p.size) || [];
     return Array.from(new Set(allSizes));
  }, [ProductList]);

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        {/* Sidebar filter — hidden on mobile, shown on md+ */}
        <div className='hidden md:block w-full md:w-[20%] p-[10px] border rounded-lg m-[20px]'>
            <div className='flex justify-between'>
              <p className='text-[16px] text-gray-600'>Filter</p>
              <FilterIcon />
            </div>
            <div>
              <p className='text-[16px] text-black mt-5'>Categories</p>
              <Categories types={categoryContent?.categoryTypes} />
              <div className='mt-4'>
                <hr />
              </div>
            </div>

            <PriceFilter />
            <div className='mt-4'>
              <hr />
            </div>
            <ColorsFilter colors={categoryColors} />
            <hr />
            <SizeFilter sizes={categorySizes} />
        </div>

        <div className='p-[10px] md:p-[15px] w-full md:w-[80%]'>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-2 md:px-4 w-full gap-2">
            <h2 className='text-lg md:text-2xl font-semibold text-gray-600 tracking-tight'>
              {categoryContent?.description}
            </h2>
            <div className="flex items-center gap-4">
               <span className="text-purple-600 font-bold text-sm md:text-md cursor-pointer">New</span>
               <span className="text-gray-500 font-medium text-sm md:text-md cursor-pointer hover:text-gray-800">Recommended</span>
            </div>
          </div> 
          <div className='pt-2 md:pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 px-2 md:px-4'>
             {isLoading ? (
                <div className="col-span-full flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
             ) : ProductList?.length > 0 ? (
                ProductList?.map((product) => <ProductcardPage key={product.id} {...product} />)
             ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-gray-100 shadow-sm mt-4">
                  <div className="bg-purple-100 p-4 rounded-full mb-4">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Available</h3>
                  <p className="text-gray-500 max-w-sm mb-6">We couldn't find any products in this category. Our store DB is currently empty. Please check back later!</p>
                  <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:ring-4 focus:ring-purple-200">
                    Refresh Page
                  </button>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
