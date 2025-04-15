import ProductModel from '../models/Product.js';
import { createProductResponse, createResponse } from '../utils/utilityFunctions.js';


export const getProducts = async (page, pageSize, keyword = '', category = '') => {
    try {
        const skip = (page - 1) * pageSize;

        const filter = {};

        if (keyword) {
            filter.name = {
                $regex: keyword,
                $options: 'i'
            };
        }

        if (category) {
            filter.category = category;
        }

        const products = await ProductModel.find(filter)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 });

        const totalProducts = await ProductModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / pageSize);

        return createProductResponse(
            200,
            'Products fetched successfully',
            products,
            {
                pagination: {
                    page,
                    pageSize,
                    totalItems: totalProducts,
                    totalPages
                },
                filters: {
                    keyword,
                    category
                }
            }
        );
    } catch (error) {
        throw createResponse(500, 'Failed to fetch products');
    }
}

export const getProductById = async (id) => {
    try {
        const product = await ProductModel.findById(id);

        if (!product) {
            throw createResponse(404, 'Product not found');
        }

        return createProductResponse(200, 'Product fetched successfully', product);
    } catch (error) {
        if (error.statusCode === 404) throw error;
        throw createResponse(500, 'Failed to fetch product');
    }
}

export const createProduct = async (productData) => {
    // console.log("productData", productData);

    try {
        const product = new ProductModel(productData);
        await product.save();

        return createProductResponse(201, 'Product created successfully', product);
    } catch (error) {
        throw createResponse(500, 'Failed to create product');
    }
    // return createResponse(200, productData)
}

export const updateProduct = async (id, updateData) => {
    try {
        const product = await ProductModel.findById(id);

        if (!product) {
            throw createResponse(404, 'Product not found');
        }

        Object.keys(updateData).forEach(key => {
            product[key] = updateData[key];
        });

        await product.save();

        return createProductResponse(200, 'Product updated successfully', product);
    } catch (error) {
        if (error.statusCode === 404) throw error;
        throw createResponse(500, 'Failed to update product');
    }
}

export const deleteProduct = async (id) => {
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            throw createResponse(404, 'Product not found');
        }
        const delProduct = await ProductModel.deleteOne({ _id: id });

        if (delProduct.deletedCount === 1) {
            return createResponse(200, 'Product deleted successfully');
        }
    } catch (error) {
        if (error.statusCode === 404) throw error;
        throw createResponse(500, 'Failed to delete product');
    }
}

export const createProductReview = async (productId, reviewData) => {
    console.log('productId', productId, 'reviewData', reviewData);
    try {
        const product = await ProductModel.findById(productId);

        if (!product) {
            throw createResponse(404, 'Product not found');
        }

        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === reviewData.user.toString()
        );

        if (alreadyReviewed) {
            throw createResponse(400, 'Product already reviewed');
        }

        product.reviews.push(reviewData);
        product.numOfReviews = product.reviews.length;

        product.ratings = product.reviews.reduce(
            (acc, item) => item.rating + acc, 0
        ) / product.reviews.length;

        await product.save();

        return createProductResponse(201, 'Review added successfully', reviewData);
    } catch (error) {
        // console.log('error', error);
        if ([400, 404].includes(error.statusCode)) throw error;
        throw createResponse(500, 'Failed to add review');
    }
}

export const getTopProducts = async () => {
    try {
        const products = await ProductModel.find({})
            .sort({ ratings: -1 })
            .limit(3);

        return createProductResponse(200, 'Top products fetched successfully', products);
    } catch (error) {
        throw createResponse(500, 'Failed to fetch top products');
    }
}