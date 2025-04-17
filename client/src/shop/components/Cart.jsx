import { Button, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            _id: "67ffc7d8458bd3c94d356ee8",
            name: "Tea",
            slug: "tea",
            images: ["http://localhost:8080/uploads/productImgs/tea/tea1.png"],
            description: "Herbat Tea from nepal",
            price: 8000,
            discountedPrice: 7040,
            category: "Supplement",
            quantity: 1,
        },
        // Add more cart items as needed
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item._id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item._id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity, 0
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-primary dark:text-secondlight mb-8">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3 ">
                    {cartItems.length === 0 ? (
                        <div className="bg-light dark:bg-background rounded-lg p-6 text-center">
                            <Icon icon="mdi:cart-remove" className="w-16 h-16 mx-auto text-secondary/70 dark:text-secondlight/70" />
                            <p className="mt-4 text-background dark:text-secondlight">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4 h-full">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-light h-full dark:bg-background rounded-lg p-4 flex flex-col sm:flex-row gap-4 border border-secondary/5 dark:border-secondlight/5 "
                                >
                                    <div className="w-full flex items-center justify-center">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-[200px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[400px] 2xl:w-[400px] h-full object-cover rounded-lg"
                                        />
                                    </div>

                                    <div className="w-full flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-semibold text-background dark:text-secondlight">
                                                {item.name}
                                            </h2>
                                            <button
                                                onClick={() => removeItem(item._id)}
                                                className="text-secondary/70 dark:text-secondlight/70 hover:text-primary"
                                            >
                                                <Icon icon="line-md:trash" className="w-6 h-6 hover:text-red-500 transition-all ease-in-out duration-300" />
                                            </button>
                                        </div>

                                        <p className="text-sm text-secondary/70 dark:text-secondlight/70 mt-1">
                                            {item.category}
                                        </p>

                                        <div className="mt-2 flex items-center gap-2">
                                            {item.discountedPrice ? (
                                                <>
                                                    <span className="text-lg font-medium text-primary">
                                                        ${(item.discountedPrice / 100).toFixed(2)}
                                                    </span>
                                                    <span className="text-sm line-through text-secondary/70 dark:text-secondlight/70">
                                                        ${(item.price / 100).toFixed(2)}
                                                    </span>
                                                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                                        {Math.round((1 - item.discountedPrice / item.price) * 100)}% OFF
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-medium text-primary">
                                                    ${(item.price / 100).toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center border border-secondary/20 dark:border-secondlight/20 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="px-3 py-1 text-background dark:text-secondlight hover:bg-secondary/10"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 text-background dark:text-secondlight">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="px-3 py-1 text-background dark:text-secondlight hover:bg-secondary/10"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="text-lg font-medium text-primary">
                                                ${((item.discountedPrice || item.price) * item.quantity / 100).toFixed(2)}
                                            </div>
                                        </div>
                                        <p className="text-background/70 dark:text-light/70 my-3 md:my-6"> {item.description}</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Order Summary */}
                <div className="lg:w-1/3 ">
                    <div className="bg-light dark:bg-background rounded-lg p-6 border border-secondary/5 dark:border-secondlight/5">
                        <h2 className="text-xl font-bold text-background dark:text-secondlight mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-secondary/70 dark:text-secondlight/70">Subtotal</span>
                                <span className="text-background dark:text-secondlight">
                                    ${(subtotal / 100).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-secondary/70 dark:text-secondlight/70">Shipping</span>
                                <span className="text-background dark:text-secondlight">Free</span>
                            </div>

                            <Divider className="my-2" />

                            <div className="flex justify-between font-bold text-lg">
                                <span className="text-background dark:text-secondlight">Total</span>
                                <span className="text-primary">
                                    ${(subtotal / 100).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6 bg-primary text-white hover:bg-primary/90"
                            size="lg"
                            disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </Button>

                        <div className="mt-4 flex items-center justify-center gap-2">
                            <Icon icon="mdi:credit-card-outline" className="w-5 h-5 text-secondary/70 dark:text-secondlight/70" />
                            <span className="text-sm text-secondary/70 dark:text-secondlight/70">
                                Secure Payment
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 bg-light dark:bg-background rounded-lg p-6 border border-secondary/5 dark:border-secondlight/5">
                        <h3 className="font-medium text-background dark:text-secondlight mb-3">
                            Add a discount code
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter code"
                                className="flex-1 px-3 py-2 border border-secondary/20 dark:border-secondlight/20 rounded-md bg-transparent text-background dark:text-secondlight"
                            />
                            <Button className="bg-secondary/10 text-background dark:text-secondlight">
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-1  h-[1000px] bg-green-100 border border-primary/50 my-4"></div>
        </div>
    );
};

export default CartPage;