import React, { useMemo } from 'react'
import FilterIcon from '../../components/common/FilterIcon'
import content from "../../data/Content.json"
// import { Category } from '../../components/Sections/Categories/Category';
import Categories from '../../filter/Categories';
import { PriceFilter } from '../../filter/PriceFilter';

const categories = content?.categories;



export const ProductListPage = ({categoryType}) => {

  const categoryContent = useMemo(()=>{
    return categories?.find((category)=> category.code === categoryType);
  },[categoryType]);


  return ( 
    <div>
      <div className='flex'>
        <div className='w-[20%] p-[20px] border rounded-lg m-[20px]'>
            <div className='flex justify-between '>
            <p className='text-[16px] text-gray-600'>Filter</p>
            <FilterIcon />
              </div>
            <div>
         <p className='text-[16px] text-black mt-5'>Categoreis</p>
         <Categories types={categoryContent?.types}/>
         <hr></hr>
         <PriceFilter />
         
         
            </div>

      </div>
         
     
     <div className='p-[15px]'>
         <p className='text-black text-lg'> {categoryContent?.description}</p>


     </div>
       
       
       
       
        </div>

    </div>
  ) 
}
 
