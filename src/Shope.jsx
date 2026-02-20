  import React from 'react'
  import HeroSection from './components/HeroSection/HeroSection'
  import  NewArrivals  from './components/Sections/NewArrivals'
  import { Category } from './components/Sections/Categories/Category'
  import content from './data/Content.json'

  export const Shope = () => {
    return (
      <div className="flex flex-col gap-4">
      <HeroSection />
      <NewArrivals />
      {content?.pages && content?.pages?.map((items,index)=><Category key={items?.title+index}{...items}/>)}
      </div>
    )
  }