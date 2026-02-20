import React from 'react'
import SectionHeading from '../SeactionHeading'
import { Card } from '../../card/Card'

export const Category = ({title, data}) => {
  return (
    <>
    <SectionHeading title={title} />
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 px-4 md:px-7'>
          {data && data?.map((items,index)=> {
          return (
            <Card key={items?.title+index} title={items?.title} description={items?.description} imagePath={items.image} actionArrow={true} /> 
        )
    })}
    </div>
    </>
  )
}
