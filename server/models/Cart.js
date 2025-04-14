import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1'],
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    selected: {
        type: Boolean,
        default: true
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// cart total
cartSchema.virtual('total').get(function () {
    return this.items.reduce((total, item) => {
        return total + (item.selected ? item.price * item.quantity : 0);
    }, 0);
});

// Update timestamp on save
cartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('Cart', cartSchema);