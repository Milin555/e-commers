import React from "react"
import SectionHeading from "./SeactionHeading"
import { Card } from "../card/Card"
import Jeans from '../../assets/img/jeans.jpg'
import Shirts from '../../assets/img/shirts.jpg'
import TShirts from "../../assets/img/tshirts.jpeg"
import Dress from '../../assets/img/dresses.jpg'
import Joggers from "../../assets/img/joggers.jpg"
import Kurti from "../../assets/img/kurtis.jpg"
import Carousel from "react-multi-carousel"
import { responsive } from "../../utils/Seaction.constans"




const items =[{
    'title':'Jeans',
    imagePath:Jeans
},
{
    'title':'Shirts',
    imagePath:Shirts
},
{
    'title':'T-Shirts',
    imagePath:TShirts
},
{
    'title':'Dress',
    imagePath:Dress
},
{
 'title':'Joggers',
    imagePath:Joggers
},{
    'title':'Kurti',
    imagePath:Kurti
}
]

const NewArrivals = () => {
  return (
          <>
         <SectionHeading title={'New Arrivals'} />
         
          <Carousel
           responsive={responsive}
           autoPlay={false}
           swipeable={true}
          draggable={false}
           showDots={false}
           infinite={false}
             partialVisible={false}
            
             className='px-4 md:px-8'
          >

            {items && items?.map((items,index)=> <Card key={items?.title+index} title={items.title} imagePath={items.imagePath}/>)}
          </Carousel>
       
         
          </>
  )
}

export default NewArrivals
