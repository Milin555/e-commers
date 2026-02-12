import React from 'react'
import SectionHeading from '../SeactionHeading'
import { Card } from '../../card/Card'

export const Category = ({title, data}) => {
  return (
    <>
    <SectionHeading title={title} />
    <div className=' flex px-8'>
          {data && data?.map((items,index)=> {
          return (
            <Card title={items?.title}  description={items?.description} imagePath={items.image} actionArrow={true} /> 

        )
    })}
    </div>
    </>
  )
}
