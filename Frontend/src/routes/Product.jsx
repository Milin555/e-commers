import { fetchProducts } from '../api/fetchProducts';
import { fetchCategories } from '../api/FecthProduct';

export const loadProductById = async ({params}) => {
    try {
        const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
        const product = products?.find((p)=> String(p?.id) === String(params?.productId));
        return { product, products, categories };
    } catch (e) {
        console.error("Error loading product:", e);
        return { product: null, products: [], categories: [] };
    }
}
