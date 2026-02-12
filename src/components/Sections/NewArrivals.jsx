import React from "react"
import SectionHeading from "./SeactionHeading"
import { Card } from "../card/Card"
import Jeans from '../../assets/img/jeans.jpg'
import Shirts from '../../assets/img/shirts.jpg'
import TShirts from "../../assets/img/tshirts.jpeg"
import Dress from '../../assets/img/dresses.jpg'

const items =[{
    'title':'Jeans',
    imagePath:Jeans
},{
    'title':'Shirts',
    imagePath:Shirts
},{
    'title':'T-Shirts',
    imagePath:TShirts
},{
    'title':'Dress',
    imagePath:Dress
}
]

const NewArrivals = () => {
  return (
          <>
         <SectionHeading title={'New Arrivals'} />
         <div className="flex flex-wrap px-[20px]">

            {items && items?.map((items,index)=> <Card key={items?.title+index} title={items.title} imagePath={items.imagePath}/>)}
         </div>
         
          </>
  )
}

export default NewArrivals
