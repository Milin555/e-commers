  import React from 'react'
  import { Navigation } from './components/Navigation/Navigation'
  import HeroSection from './components/HeroSection/HeroSection'
  import  NewArrivals  from './components/Sections/NewArrivals'
  import { Category } from './components/Sections/Categories/Category'
  import content from './data/Content.json'
  import Footer from './footer/Footer'


 
  export const Shope = () => {
    return (
      <>
      <Navigation />
      <HeroSection />
      <NewArrivals />
      {content?.categories && content?.categories?.map((items,index)=><Category key={items?.title+index}{...items}/>)}
      <Footer content={content?.footer} />
      </>
    )
  }

