import ProductModel from '../models/Product.js';
import ErrorResponse from '../utils/utilityFunctions.js';

export const getProducts = async (page, pageSize, keyword = '', category = '') => {
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

    return {
        products,
        totalPages,
        page,
        pageSize
    };
}

export const getProductById = async (id) => {
    const product = await ProductModel.findById(id);

    if (!product) {
        throw new ErrorResponse('Product not found', 404);
    }

    return product;
}

export const createProduct = async (productData) => {
    const product = new ProductModel(productData);
    await product.save();
    return product;
}

export const updateProduct = async (id, updateData) => {
    const product = await ProductModel.findById(id);

    if (!product) {
        throw new ErrorResponse('Product not found', 404);
    }

    Object.keys(updateData).forEach(key => {
        product[key] = updateData[key];
    });

    await product.save();
    return product;
}

export const deleteProduct = async (id) => {
    const product = await ProductModel.findById(id);

    if (!product) {
        throw new ErrorResponse('Product not found', 404);
    }

    await product.remove();
}

export const createProductReview = async (productId, reviewData) => {
    const product = await ProductModel.findById(productId);

    if (!product) {
        throw new ErrorResponse('Product not found', 404);
    }

    const alreadyReviewed = product.reviews.find(
        r => r.user.toString() === reviewData.user.toString()
    );

    if (alreadyReviewed) {
        throw new ErrorResponse('Product already reviewed', 400);
    }

    product.reviews.push(reviewData);
    product.numOfReviews = product.reviews.length;

    product.ratings = product.reviews.reduce(
        (acc, item) => item.rating + acc, 0
    ) / product.reviews.length;

    await product.save();
    return reviewData;
}

export const getTopProducts = async () => {
    const products = await ProductModel.find({})
        .sort({ ratings: -1 })
        .limit(3);

    return products;
}