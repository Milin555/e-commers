import React, { useMemo } from 'react'
import FilterIcon from '../../components/common/FilterIcon'
import content from "../../data/Content.json"
import Categories from '../../filter/Categories';
import { PriceFilter } from '../../filter/PriceFilter';
import ColorsFilter from '../../filter/colors';
import SizeFilter from '../../filter/SizeFilter';
import { ProductcardPage } from '../ProductcardPage';

const categories = content?.categories;

export const ProductListPage = ({ categoryType }) => {

  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType);
  }, [categoryType]);

  const ProductList = useMemo(() => {
    return content?.products?.filter((product) => product?.category_id === categoryContent?.id);
  }, [categoryContent]);

  return (
    <div>
      <div className='flex'>
        <div className='w-[20%] p-[10px] border rounded-lg m-[20px]'>
            <div className='flex justify-between'>
              <p className='text-[16px] text-gray-600'>Filter</p>
              <FilterIcon />
            </div>
            <div>
              <p className='text-[16px] text-black mt-5'>Categories</p>
              <Categories types={categoryContent?.types} />
              <div className='mt-4'>
                <hr />
              </div>
            </div>

            <PriceFilter />
            <div className='mt-4'>
              <hr />
            </div>
            <ColorsFilter colors={categoryContent?.meta_data?.colors} />
            <hr />
            <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
        </div>

        <div className='p-[15px] w-[80%]'>
          <div className="flex justify-between items-center mb-4 px-4 w-full">
            <h2 className='text-2xl font-semibold text-gray-600 tracking-tight'>
              {categoryContent?.description}
            </h2>
            <div className="flex items-center gap-4">
               <span className="text-purple-600 font-bold text-md cursor-pointer">New</span>
               <span className="text-gray-500 font-medium text-md cursor-pointer hover:text-gray-800">Recommended</span>
            </div>
          </div> 
          <div className='pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4'>
             {ProductList?.map((product) => <ProductcardPage key={product.id} {...product} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
