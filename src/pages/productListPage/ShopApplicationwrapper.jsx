import React from 'react'
import { Navigation } from '../../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'

function ShopApplicationwrapper() {
  return (
    <div>
        <Navigation />
        <Outlet />
    </div>
  )
}

export default ShopApplicationwrapper