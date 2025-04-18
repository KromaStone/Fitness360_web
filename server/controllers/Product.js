import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
    getProductsAd
} from '../services/ProductService.js';
import { createResponse, validatePagination } from '../utils/utilityFunctions.js';

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

export const GetProductsAd = async (req, res) => {
    try {
        const { page, pageSize, keyword, category } = req.query;
        const { validatedPage, validatedPageSize } = validatePagination(page, pageSize);

        const productData = await getProductsAd(
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
        const productData = req.body;
        if (!productData.name || !productData.price || !productData.category) {
            return res.status(400).send(
                createResponse(400, "Product name, price and category are required.", null)
            );
        }

        const imageBaseUrl = process.env.BASE_URL_MEDIA || '';

        if (req.files["images"]) {
            const images = req.files["images"][0];
            productData.images = `${imageBaseUrl}/${images.path.replace(/\\/g, "/")}`;
        }

        if (req.files["images"]) {
            productData.images = req.files["images"].map(file =>
                `${imageBaseUrl}/${file.path.replace(/\\/g, "/")}`
            );
        }
        //  defaults
        productData.discount = productData.discount || 0;
        productData.stock = productData.stock || 0;
        productData.slug = productData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const productResponse = await createProduct(productData);
        return res.status(productResponse.statusCode).send(productResponse);

    } catch (error) {
        return res.status(500).send(
            createResponse(500, error?.message || "Internal Server Error", null)
        );
    }
};

export const UpdateProduct = async (req, res) => {
    console.log('updateData ', req.params.id);
    console.log('updateData ----- ', req)

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
        const productData = await deleteProduct(req.params.id);
        res.status(productData.statusCode).send(productData);
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
                user: req.user.id,
                name: req.user.userName,
                rating: Number(rating),
                comment
            }
        );
        // res.status(201).send({ review });
        res.status(review.statusCode).send(review);

    } catch (e) {
        res.status(400).send({
            error: e?.message
        });
    }
}
    ;
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