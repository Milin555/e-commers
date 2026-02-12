import React from 'react'
import Jeans from '../../assets/img/jeans.jpg'
import ArrowIcon from '../common/Arrowicon'
export const Card = ({ imagePath, title, description, actionArrow }) => {
  return (
    <div className="flex flex-col p-8">
      <img
        className="h-[292px] w-[231px] object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        src={imagePath}
        alt={title} 
      />
        <div className='flex justify-between items-center'>
      <div className='flex flex-col'>
          <p className='text-[16px] p-1'>{title}</p>
          {description && <p className='text-[12px] px-1 text-gray-600'>{description}</p>}
          </div>
        
          {actionArrow && <span className='cursor-pointer pr-2 items-center'><ArrowIcon /></span>}
            </div>

    </div>
  )
}
