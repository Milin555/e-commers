import React from 'react'

export const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <span key={s} className={`text-base ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
    ))}
  </div>
);
