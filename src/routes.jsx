import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProductListPage } from './pages/productListPage/ProductListPage';
import { Shope } from './Shope';
import ShopApplicationwrapper from './pages/productListPage/ShopApplicationwrapper';

 
export const router = createBrowserRouter([
 {
    path:"/",
    element: <ShopApplicationwrapper />,
    children:[
        {
           path:"/",
           element:<Shope />
        },
        {
            path:"/women",
            element:<ProductListPage categoryType={"WOMEN"} />

        },
        {
            path:"/men",
            element:<ProductListPage  categoryType={"MEN"} />

        },
        {
            path:"/kids",
            element:<ProductListPage  categoryType={"KIDS"} />

        }


    ]
 }
]);