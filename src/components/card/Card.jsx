import React from 'react'
import ArrowIcon from '../common/Arrowicon'

export const Card = ({ imagePath, title, description, actionArrow }) => {
  return (
    <div className="flex flex-col p-4 group cursor-pointer flex-1 min-w-0">
      <div className="overflow-hidden rounded-2xl">
        <img
          className="h-[250px] sm:h-[350px] md:h-[423px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imagePath}
          alt={title} 
        />
      </div>
      <div className='flex justify-between items-center mt-2'>
        <div className='flex flex-col min-w-0'>
          <p className='text-[14px] md:text-[15px] font-semibold text-gray-900 truncate'>{title}</p>
          {description && <p className='text-[11px] text-gray-400 truncate'>{description}</p>}
        </div>
        {actionArrow && <span className='cursor-pointer hover:translate-x-1 transition-transform shrink-0'><ArrowIcon /></span>}
      </div>
    </div>
  )
}
