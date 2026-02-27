import React, { useState } from 'react'


const Categories = ({types, onChange}) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (e, code) => {
    const isChecked = e.target.checked;
    let newItems = [...checkedItems];
    if (isChecked) {
      newItems.push(code);
    } else {
      newItems = newItems.filter(item => item !== code);
    }
    setCheckedItems(newItems);
    onChange && onChange(newItems);
  };

  return (
    <div >
      {types?.map(type=>{
        return (
          <div className='flex items-center p-1' key={type?.code}>
            <input type='checkbox' name={type?.code} className='border rounded-xl w-4 h-4 accent-black text-black' onChange={(e) => handleCheckboxChange(e, type?.code)} checked={checkedItems.includes(type?.code)} />
            <label htmlFor={type?.code} className='px-2 text-[14px] text-gray-600'>{type?.name}</label>
          </div>
        )
      })}
    </div>
  )
}

export default Categories