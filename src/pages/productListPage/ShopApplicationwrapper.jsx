import React from 'react'
import { Navigation } from '../../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from '../../footer/Footer'
import content from '../../data/Content.json'


function ShopApplicationwrapper() {
  return (
    <div>
        <Navigation />
        <Outlet />
        <Footer content={content?.footer}/>
    </div>
  )
}

export default ShopApplicationwrapper