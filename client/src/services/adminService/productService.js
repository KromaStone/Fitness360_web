import axios from 'axios';
import { productsEp, productsEpAd } from '../apiEndPoint/EnpPoint';

const token = localStorage.getItem('token') || sessionStorage.getItem('token')

export const getAllProducts = async (page = 1, pageSize = 10) => {
    try {
        const response = await axios.get(productsEpAd, {
            params: { page, pageSize },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.productData;
    } catch (error) {
        throw error;
    }
};

export const CreateProduct = async (productData) => {
    try {
        const response = await axios.post(productsEp, productData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const UpdateProduct = async (id, productData) => {
    try {
        // for (let pair of productData.entries()) {
        //     console.log(`-----${pair[0]}:`, pair[1]);
        // }
        // console.log('Product data:', productData);
        const response = await axios.put(
            `${productsEp}/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Update product error:', error);
        throw error;
    }
};


export const DeleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${productsEp}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};