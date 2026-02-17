import React from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export const PriceFilter = () => {
  return (
    <div>
     <p className='text-[16px] text-black mt-5'> Price </p>
     <RangeSlider />
    </div>
  )
}
