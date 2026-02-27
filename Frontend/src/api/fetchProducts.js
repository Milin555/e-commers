import axios from "axios";
import { API_BASE_URL, API_URLS } from "./Constant"

export const fetchProducts = async()=> {
    const url = API_BASE_URL + API_URLS.GET_PRODUCTS;

    try{
        const result = await axios(url,{
            method:'GET'
        });
        
        return result?.data?.map(product => {
            const thumbnailResource = product.resources?.find(res => res.primary) || product.resources?.[0];
            const images = product.resources?.map(res => res.url) || [];
            
            const colorSet = new Set();
            const sizeSet = new Set();
            product.productVariantLists?.forEach(variant => {
                if (variant.color) colorSet.add(variant.color);
                if (variant.size) sizeSet.add(variant.size);
            });

            return {
                id: product.id,
                title: product.name,
                description: product.description,
                category_id: product.category?.id,
                type_id: product.categoryType?.id,
                brand: product.brand,
                price: product.price,
                size: Array.from(sizeSet),
                color: Array.from(colorSet),
                discount: 0,
                thumbnail: thumbnailResource?.url || "",
                images: images,
                rating: product.rating,
                isNewArrival: product.newArrival
            };
        }) || [];
    }
    catch(e){
        console.log("Error fetching products:", e);
        return [];
    }
}
