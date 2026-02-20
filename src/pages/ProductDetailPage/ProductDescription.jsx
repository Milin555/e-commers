import React from 'react'

export const ProductDescription = ({ description }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
        <span className="w-1 h-5 bg-black rounded-full inline-block"></span>
        Product Description
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-2xl">{description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Fabric', value: 'Bio-washed Cotton' },
          { label: 'Pattern', value: 'Printed' },
          { label: 'Fit', value: 'Regular-fit' },
          { label: 'Neck', value: 'Round Neck' },
          { label: 'Sleeve', value: 'Half-sleeves' },
          { label: 'Style', value: 'Casual Wear' },
        ].map(attr => (
          <div key={attr.label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">{attr.label}</p>
            <p className="text-sm font-semibold text-gray-800">{attr.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
