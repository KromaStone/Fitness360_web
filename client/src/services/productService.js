import axios from 'axios';
import { productsEp } from './apiEndPoint/EnpPoint';

// const token = localStorage.getItem('token') || sessionStorage.getItem('token');

export const getAllProducts = async (page = 1, pageSize = 10, keyword = '', category = '') => {
    try {
        const response = await axios.get(productsEp, {
            params: {
                page,
                pageSize,
                ...(keyword && { keyword }),
                ...(category && { category })
            }
        });
        return response.data.productData;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Unable to fetch products");
    }
};