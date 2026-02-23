import React from 'react'
import content from '../data/Content.json'

export const loadProductById = ({params}) => {
    const product = content?.products?.find((product)=> product?.id.toString() === params?.productId.toString());
    return {product};
  
}
