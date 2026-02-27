  import React, { useEffect } from 'react'
  import HeroSection from './components/HeroSection/HeroSection'
  import  NewArrivals  from './components/Sections/NewArrivals'
  import { Category } from './components/Sections/Categories/Category'
  import content from './data/Content.json'
  import { fetchCategories } from './api/FecthProduct';
// import { useDispatch } from 'react-redux';
// import { loadCategories } from './store/features/category';
// import { setLoading } from './store/features/common';

  export const Shope = () => {
    // const dispatch = useDispatch();
    
   
  useEffect(()=>{
    // dispatch(setLoading(true));
    fetchCategories().then(res=>{
      // dispatch(loadCategories(res));
      console.log("Categories loaded:", res);
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      // dispatch(setLoading(false));
    })
  },[]);

    return (
      <div className="flex flex-col gap-4">
      <HeroSection />
      <NewArrivals />
      {content?.pages && content?.pages?.map((items,index)=><Category key={items?.title+index}{...items}/>)}
      </div>
    )
  }