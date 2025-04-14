import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
} from '../services/ProductService.js';
import { validatePagination } from '../utils/utilityFunctions.js';

export const GetProducts = async (req, res) => {
    try {
        const { page, pageSize, keyword, category } = req.query;
        const { validatedPage, validatedPageSize } = validatePagination(page, pageSize);

        const productData = await getProducts(
            validatedPage,
            validatedPageSize,
            keyword,
            category
        );

        res.status(200).send({ productData });
    } catch (e) {
        res.status(404).send({
            error: e?.message
        });
    }
}

export const GetProductById = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).send({ product });
    } catch (e) {
        res.status(404).send({
            error: e?.message
        });
    }
}

export const CreateProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            user: req.user._id,
            images: req.files.map(file => file.path)
        };

        const product = await createProduct(productData);
        res.status(201).send({ product });
    } catch (e) {
        res.status(400).send({
            error: e?.message
        });
    }
}

export const UpdateProduct = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        res.status(200).send({ product });
    } catch (e) {
        res.status(404).send({
            error: e?.message
        });
    }
}

export const DeleteProduct = async (req, res) => {
    try {
        await deleteProduct(req.params.id);
        res.status(200).send({ message: 'Product removed' });
    } catch (e) {
        res.status(404).send({
            error: e?.message
        });
    }
}

export const CreateProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await createProductReview(
            req.params.id,
            {
                user: req.user._id,
                name: req.user.name,
                rating: Number(rating),
                comment
            }
        );
        res.status(201).send({ review });
    } catch (e) {
        res.status(400).send({
            error: e?.message
        });
    }
}

export const GetTopProducts = async (req, res) => {
    try {
        const products = await getTopProducts();
        res.status(200).send({ products });
    } catch (e) {
        res.status(404).send({
            error: e?.message
        });
    }
}