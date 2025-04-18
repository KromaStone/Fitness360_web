import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, Toaster } from 'sonner';
import { fadeIn } from "../../assets/utils/motion";
import { NextButton } from "../../components/NextButton";
import { CreateProduct, DeleteProduct, getAllProducts, UpdateProduct } from '../../services/adminService/productService';
import { Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem, Checkbox, Card, CardBody, Image, Divider } from "@nextui-org/react";

function Product() {
    const [loading, setLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        brand: '',
        stock: '',
        featured: false,
        discount: '',
        images: []
    });

    const [errors, setErrors] = useState({});

    const categories = [
        { value: 'Equipment', label: 'Equipment' },
        { value: 'Supplement', label: 'Supplement' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Other', label: 'Other' }
    ];

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'name':
                if (!value) error = 'Product name is required';
                else if (value.length > 100) error = 'Product name cannot exceed 100 characters';
                break;
            case 'description':
                if (!value) error = 'Product description is required';
                else if (value.length > 1000) error = 'Description cannot exceed 1000 characters';
                break;
            case 'price':
                if (!value && value !== 0) error = 'Product price is required';
                else if (value < 0) error = 'Price cannot be negative';
                break;
            case 'category':
                if (!value) error = 'Product category is required';
                break;
            case 'stock':
                if (!value && value !== 0) error = 'Product stock is required';
                else if (value < 0) error = 'Stock cannot be negative';
                break;
            case 'discount':
                if (value < 0) error = 'Discount cannot be negative';
                else if (value > 100) error = 'Discount cannot exceed 100%';
                break;
            case 'images':
                if ((!value || value.length === 0) && (!previewImages || previewImages.length === 0))
                    error = 'At least one product image is required';
                break;
        }

        return error;
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        // Special validation for images
        if ((!formData.images || formData.images.length === 0) && (!previewImages || previewImages.length === 0)) {
            newErrors.images = 'At least one product image is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field changes
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleImageChange = (e) => {
        console.log('e.target.files ------ ', e.target.files);
        const files = Array.from(e.target.files);
        setSelectedImages(files);
        const imagePreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);

        if (errors.images) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.images;
                return newErrors;
            });
        }
    };

    const removeImage = (index) => {
        const newPreviewImages = [...previewImages];
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);

        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        setSelectedImages(newSelectedImages);
    };

    const [colDefs, setColDefs] = useState([
        {
            headerName: 'Sr No',
            valueGetter: 'node.rowIndex + 1',
            width: 70,
            pinned: 'left'
        },
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description" },
        {
            field: "price",
            headerName: "Price",
            cellRenderer: (params) => `$${(params.value / 100).toFixed(2)}`
        },
        {
            field: "discountedPrice",
            headerName: "Discounted Price",
            cellRenderer: (params) => params.value ? `$${(params.value / 100).toFixed(2)}` : '-'
        },
        { field: "category", headerName: "Category" },
        { field: "stock", headerName: "Stock" },
        { field: "ratings", headerName: "Rating" },
        {
            field: "featured",
            headerName: "Featured",
            cellRenderer: (params) => params.value ? 'Yes' : 'No'
        },
        {
            field: "images",
            headerName: "Image",
            cellRenderer: (params) => (
                params.value?.length > 0 ? (
                    <LazyLoadImage
                        src={params.value[0]}
                        alt="Product"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                ) : '-'
            ),
        },
        {
            field: "actionButtons",
            headerName: "Actions",
            cellRenderer: (params) => (
                <div>
                    <button
                        className="bg-cyan-100 border border-cyan-400 hover:bg-cyan-500 hover:text-light transition-all ease-in-out duration-300  mx-1 rounded h-9 px-[14px] text-center"
                        onClick={() => handleEdit(params.data)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-100 border border-red-400 hover:bg-red-500 hover:text-light transition-all ease-in-out duration-300  mx-1 rounded h-9 px-[14px] text-center"
                        onClick={() => handleDelete(params.data)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ]);

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            subCategory: '',
            brand: '',
            stock: '',
            featured: false,
            discount: '',
            images: []
        });
        setPreviewImages([]);
        setSelectedImages([]);
        setErrors({});
        setEditData(null);
    };

    useEffect(() => {
        document.title = 'Products | Fitness360'
        fetchAllProducts(currentPage);
    }, [currentPage]);

    const handleEdit = (rowData) => {
        setEditData(rowData);
        setFormData({
            ...rowData,
            price: rowData.price / 100 // Convert cents to dollars for form
        });
        setPreviewImages(rowData.images || []);
        setOpenForm(true);
    };

    const handleUpdateProduct = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'images') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Convert price to cents
            formDataToSend.set('price', Math.round(formData.price * 100));

            // Add existing images
            if (editData?.images) {
                editData.images.forEach(img => formDataToSend.append('existingImages', img));
            }

            // Add new images
            selectedImages.forEach(file => {
                formDataToSend.append('images', file);
            });

            // for (let pair of formDataToSend.entries()) {
            //     console.log(`${pair[0]}:`, pair[1]);
            // }

            const result = await UpdateProduct(editData._id, formDataToSend);
            toast.success('Product Updated Successfully');
            resetForm();
            setOpenForm(false);
            fetchAllProducts();
        } catch (error) {
            console.error("Error Updating product:", error);
            toast.error('Unable to Update Product');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'images') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Convert price to cents
            formDataToSend.set('price', Math.round(formData.price * 100));

            // Add images
            selectedImages.forEach(file => {
                formDataToSend.append('images', file);
            });

            const result = await CreateProduct(formDataToSend);
            toast.success('Product Created Successfully');
            resetForm();
            setOpenForm(false);
            fetchAllProducts();
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error('Unable to Create product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (rowData) => {
        setSelectedProduct(rowData._id);
        setDeletePopUp(true);
    };

    const confirmDelete = async () => {
        if (selectedProduct) {
            await deleteProduct(selectedProduct);
            setDeletePopUp(false);
            setSelectedProduct(null);
        }
    };

    const cancelDelete = () => {
        setDeletePopUp(false);
        toast.info('Product not deleted');
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await DeleteProduct(id);
            fetchAllProducts();
            toast.success('Product Deleted Successfully');
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error('Unable to delete product');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProducts = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const result = await getAllProducts(page, pageSize);
            setRowData(result.data);
            setTotalPages(result.totalPages);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const toggleOpenForm = () => {
        setOpenForm(!openForm);
        if (openForm) {
            resetForm();
        }
    }

    return (
        <>
            {/* Delete Confirmation Modal */}
            <Modal isOpen={deletePopUp} onClose={cancelDelete}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this product?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={confirmDelete}>
                                    Delete
                                </Button>
                                <Button color="default" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Spinner
                label="Loading..."
                color="success"
                className={`absolute rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-svh w-svw z-50 bg-light dark:bg-background ${loading ? "" : "hidden"}`}
            />

            <Toaster className="z-40" richColors position="top-right" />

            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .2, 0.75)}
                className="flex justify-between items-center mb-8"
            >
                <h2 className="text-xl">Product Management</h2>
                <Button
                    color="primary"
                    className={`${openForm ? 'hidden' : ''}`}
                    onClick={toggleOpenForm}
                >
                    Add Product
                </Button>
            </motion.div>

            {/* Product Form Modal */}
            <Modal
                isOpen={openForm}
                onClose={toggleOpenForm}
                size="5xl"
                scrollBehavior="inside"
                backdrop="opaque"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {editData ? 'Edit Product' : 'Add New Product'}
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <Input
                                            label="Product Name"
                                            value={formData.name}
                                            onValueChange={(value) => handleChange('name', value)}
                                            isRequired
                                            isInvalid={!!errors.name}
                                            errorMessage={errors.name}
                                            maxLength={100}
                                        />

                                        <Textarea
                                            label="Description"
                                            value={formData.description}
                                            onValueChange={(value) => handleChange('description', value)}
                                            isRequired
                                            isInvalid={!!errors.description}
                                            errorMessage={errors.description}
                                            maxLength={1000}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Price ($)"
                                                type="number"
                                                value={formData.price}
                                                onValueChange={(value) => handleChange('price', value)}
                                                isRequired
                                                isInvalid={!!errors.price}
                                                errorMessage={errors.price}
                                                min={0}
                                                step="0.01"
                                            />

                                            <Input
                                                label="Discount (%)"
                                                type="number"
                                                value={formData.discount}
                                                onValueChange={(value) => handleChange('discount', value)}
                                                isInvalid={!!errors.discount}
                                                errorMessage={errors.discount}
                                                min={0}
                                                max={100}
                                            />
                                        </div>

                                        <Select
                                            label="Category"
                                            selectedKeys={[formData.category]}
                                            onChange={(e) => handleChange('category', e.target.value)}
                                            isRequired
                                            isInvalid={!!errors.category}
                                            errorMessage={errors.category}
                                        >
                                            {categories.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Sub Category"
                                                value={formData.subCategory}
                                                onValueChange={(value) => handleChange('subCategory', value)}
                                            />

                                            <Input
                                                label="Brand"
                                                value={formData.brand}
                                                onValueChange={(value) => handleChange('brand', value)}
                                            />
                                        </div>

                                        <Input
                                            label="Stock"
                                            type="number"
                                            value={formData.stock}
                                            onValueChange={(value) => handleChange('stock', value)}
                                            isRequired
                                            isInvalid={!!errors.stock}
                                            errorMessage={errors.stock}
                                            min={0}
                                        />

                                        <Checkbox
                                            isSelected={formData.featured}
                                            onValueChange={(value) => handleChange('featured', value)}
                                        >
                                            Featured Product
                                        </Checkbox>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Product Images {previewImages.length > 0 ? `(${previewImages.length})` : ''}
                                            </label>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="product-images"
                                            />
                                            <label
                                                htmlFor="product-images"
                                                className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <span className="text-gray-500">Click to upload images</span>
                                                    <span className="text-xs text-gray-400">(JPEG, PNG, WEBP)</span>
                                                </div>
                                            </label>
                                            {errors.images && (
                                                <p className="mt-1 text-sm text-danger">{errors.images}</p>
                                            )}
                                        </div>

                                        {previewImages.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium">Image Previews</h4>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {previewImages.map((img, index) => (
                                                        <Card key={index} className="relative">
                                                            <CardBody className="p-2">
                                                                <Image
                                                                    src={img}
                                                                    alt={`Preview ${index + 1}`}
                                                                    className="w-full h-24 object-cover"
                                                                />
                                                                <Button
                                                                    isIconOnly
                                                                    size="sm"
                                                                    color="danger"
                                                                    className="absolute top-1 right-1"
                                                                    onClick={() => removeImage(index)}
                                                                >
                                                                    ×
                                                                </Button>
                                                            </CardBody>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={editData ? handleUpdateProduct : handleSubmit}
                                >
                                    {editData ? 'Update Product' : 'Add Product'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .4, 0.75)}
                className="ag-theme-quartz h-[80%]"
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
                <div className="m-2 border-none rounded-xl flex justify-end items-center w-fit-conte">
                    <div className="border-1 dark:border-secondlight border-background rounded-lg p-[1px] flex justify-center">
                        <NextButton
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            color="secondary"
                            className="w-32 dark:bg-light dark:text-background"
                        >
                            Previous
                        </NextButton>
                        <span className="mx-[2px] border-1 border-background dark:border-light rounded-lg px-2 pt-[8px] text-background dark:text-light">
                            Page {currentPage} of {totalPages}
                        </span>
                        <NextButton
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            color="secondary"
                            className="w-32 dark:bg-light dark:text-background"
                        >
                            Next
                        </NextButton>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Product;