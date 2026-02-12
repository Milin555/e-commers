import React from 'react'
import Jeans from '../../assets/img/jeans.jpg'
export const Card = ({ imagePath, title }) => {
  return (
    <div className="flex flex-col p-8">
      <img
        className="h-[292px] w-[231px] object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        src={imagePath}
        alt={title} 
      />
      <p className="mt-3 text-[16px] font-medium">{title}</p>
    </div>
  )
}
