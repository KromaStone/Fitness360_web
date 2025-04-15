import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    slug: {
        type: String,
        required: false,
        unique: true,
        lowercase: true
    },
    images: [{
        type: String,
        required: [true, 'At least one product image is required']
    }],
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['Equipment', 'Supplement', 'Clothing', 'Accessories', 'Other']
    },
    subCategory: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: false
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    featured: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// slug from name before saving
productSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    next();
});

// discounted price
productSchema.virtual('discountedPrice').get(function () {
    return this.price * (1 - this.discount / 100);
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
