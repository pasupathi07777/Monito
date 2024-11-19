// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./AddPetsProduct.css";
// import { useService } from '../../service/ServiceProvider';

// const AddPetsProduct = () => {
//     const {PORT}=useService()
//     const [products, setProducts] = useState([]);
//     const [form, setForm] = useState({
//         seller: '',
//         name: '',
//         price: '',
//         stock: '',
//         description: '',
//         quantity: '',
//         images: []
//     });
//     const [editMode, setEditMode] = useState(false);
//     const [productIdToEdit, setProductIdToEdit] = useState(null);
//     const [error, setError] = useState('');

//     // Fetch pet products on component load
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get(`${PORT}/api/products/getproduct`);
//                 setProducts(response.data.allPets);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//                 setError('Failed to fetch products.');
//             }
//         };
//         fetchProducts();
//     }, [form]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         const newFiles = Array.from(e.target.files);
//         setForm((prevForm) => ({
//             ...prevForm,
//             images: [...(prevForm.images || []), ...newFiles]
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const productData = new FormData();

//         // Append data to FormData
//         for (const key in form) {
//             if (Array.isArray(form[key])) {
//                 form[key].forEach((file) => productData.append(key, file));
//             } else {
//                 productData.append(key, form[key]);
//             }
//         }

//         console.log('FormData contents:');
//         productData.forEach((value, key) => {
//             console.log(`${key}:`, value);
//         });

//         try {
//             if (editMode) {
//                 console.log("Editing product ID:", productIdToEdit);
//                 const response = await axios.put(`${PORT}/api/products/updateproduct/${productIdToEdit}`, productData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 setProducts((prevProducts) =>
//                     prevProducts.map((product) =>
//                         product._id === productIdToEdit ? response.data : product
//                     )
//                 );
//                 resetForm();
//             } else {
//                 const response = await axios.post(`${PORT}/api/products/postproduct`, productData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 setProducts((prevProducts) => [...prevProducts, response.data]);
//                 resetForm();
//             }
//         } catch (error) {
//             console.error('Error adding/updating product:', error);
//             setError('Error adding/updating product. Please try again.');
//         }
//     };

//     const resetForm = () => {
//         setForm({
//             seller: '',
//             name: '',
//             price: '',
//             stock: '',
//             description: '',
//             quantity: '',
//             images: []
//         });
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${PORT}/api/products/deleteproduct/${id}`);
//             setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             setError('Error deleting product. Please try again.');
//         }
//     };

//     const handleEdit = (product) => {
//         setForm({
//             seller: product.seller,
//             name: product.name,
//             price: product.price,
//             stock: product.stock,
//             description: product.description,
//             quantity: product.quantity,
//             images: product.images
//         });
//         setProductIdToEdit(product._id);
//         setEditMode(true);
//         console.log(form)
//     };

//     const handleImageRemove = (index) => {
//         setForm((prevForm) => {
//             const updatedImages = prevForm.images.filter((_, i) => i !== index);
//             return { ...prevForm, images: updatedImages };
//         });
//     };

//     return (
//         <div className="overflow-scroll min-h-screen w-screen py-6 bg-gray-100 scroll-container">
//             <form onSubmit={handleSubmit} encType="multipart/form-data" className="m-auto w-[90%] md:max-w-[50%] overflow-auto bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold mb-4">{editMode ? 'Update Pet Product' : 'Add Pet Product'}</h2>

//                 <div className="mb-4">
//                     <label htmlFor="seller" className="block mb-2">Seller</label>
//                     <input
//                         type="text"
//                         name="seller"
//                         placeholder="Seller"
//                         value={form.seller}
//                         onChange={handleInputChange}
//                         required
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="name" className="block mb-2">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         value={form.name}
//                         onChange={handleInputChange}
//                         required
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="price" className="block mb-2">Price</label>
//                     <input
//                         type="number"
//                         name="price"
//                         placeholder="Price"
//                         value={form.price}
//                         onChange={handleInputChange}
//                         required
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="stock" className="block mb-2">Stock</label>
//                     <input
//                         type="number"
//                         name="stock"
//                         placeholder="Stock"
//                         value={form.stock}
//                         onChange={handleInputChange}
//                         required
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="quantity" className="block mb-2">Quantity</label>
//                     <input
//                         type="text"
//                         name="quantity"
//                         placeholder="Quantity"
//                         value={form.quantity}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="description" className="block mb-2">Description</label>
//                     <textarea
//                         name="description"
//                         placeholder="Description"
//                         value={form.description}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="text-gray-700 font-medium">Images</label>
//                     <div className="flex mt-2 items-center border border-gray-300 rounded-md overflow-hidden">
//                         <span className="flex-1 px-3 text-gray-500">Choose Image</span>
//                         <label className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer" htmlFor="customFile">
//                             Add
//                         </label>
//                         <input
//                             type="file"
//                             id="customFile"
//                             name="image"
//                             multiple
//                             onChange={handleFileChange}
//                             className="hidden"
//                         />
//                     </div>
//                     <div className="flex w-full items-center gap-2 mt-3">
//                         {Array.isArray(form.images) && form.images.map((pro, index) => (
//                             <div key={index} className="relative">
//                                 <img
//                                     src={pro instanceof File ? URL.createObjectURL(pro) : ''}
//                                     alt={`Image Preview ${index + 1}`}
//                                     className="w-20 h-20 object-cover rounded-md"
//                                 />
//                                 <button
//                                     onClick={() => handleImageRemove(index)}
//                                     className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full"
//                                 >
//                                     X
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>


//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                     {editMode ? 'Update Pet Product' : 'Add Pet Product'}
//                 </button>
//             </form>

//           <div className='px-5'>
//           <h2 className="text-xl font-bold mt-6">Pet Product List</h2>
//             <ul className="mt-4">
//                 {products.map((product) => (
//                     <li key={product._id} className="flex justify-between items-center p-4 bg-gray-100 rounded mb-2">
//                         <div>
//                             <h3 className="text-lg font-semibold">{product.name}</h3>
//                             <p>Seller: {product.seller}</p>
//                             <p>Price: ${product.price}</p>
//                             <p>Stock: {product.stock}</p>
//                             <p>Quantity: {product.quantity}</p>
//                         </div>
//                         <div className='flex '>
//                             <button
//                                 onClick={() => handleEdit(product)}
//                                 className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(product._id)}
//                                 className="bg-red-500 text-white px-2 py-1 rounded"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//     );
// };

// export default AddPetsProduct;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddPetsProduct.css";
import { useService } from '../../service/ServiceProvider';

const AddPetsProduct = () => {
    const { PORT } = useService();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        seller: '',
        name: '',
        price: '',
        stock: '',
        description: '',
        quantity: '',
        images: [] // To store Base64 strings
    });
    const [imagePreview, setImagePreview] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState(null);
    const [error, setError] = useState('');

    // Fetch pet products on component load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${PORT}/api/products/getproduct`);
                setProducts(response.data.allPets);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products.');
            }
        };
        fetchProducts();
    }, [PORT]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const onImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [];
        const newPreviews = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push(reader.result); // Base64 string
                newPreviews.push(reader.result); // Preview
                if (newImages.length === files.length) {
                    // Ensure all files are processed before updating state
                    setForm((prevForm) => ({
                        ...prevForm,
                        images: [...prevForm.images, ...newImages],
                    }));
                    setImagePreview((prevPreview) => [...prevPreview, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                const response = await axios.put(`${PORT}/api/products/updateproduct/${productIdToEdit}`, form);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productIdToEdit ? response.data : product
                    )
                );
                resetForm();
            } else {
                const response = await axios.post(`${PORT}/api/products/postproduct`, form);
                setProducts((prevProducts) => [...prevProducts, response.data]);
                resetForm();
            }
        } catch (error) {
            console.error('Error adding/updating product:', error);
            setError('Error adding/updating product. Please try again.');
        }
    };

    const resetForm = () => {
        setForm({
            seller: '',
            name: '',
            price: '',
            stock: '',
            description: '',
            quantity: '',
            images: []
        });
        setImagePreview([]);
        setEditMode(false);
        setProductIdToEdit(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${PORT}/api/products/deleteproduct/${id}`);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== id)
            );
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Error deleting product. Please try again.');
        }
    };

    const handleEdit = (product) => {
        setForm({
            seller: product.seller,
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            quantity: product.quantity,
            images: product.images
        });
        setImagePreview(product.images);
        setProductIdToEdit(product._id);
        setEditMode(true);
    };

    return (
        <div className="add-pets-product">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="seller"
                    placeholder="Seller"
                    value={form.seller}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleInputChange}
                />
                <input type="file" accept="image/*" multiple onChange={onImageChange} />
                <div className="image-preview">
                    {imagePreview.map((image, index) => (
                        <img key={index} src={image} alt={`Preview ${index}`} />
                    ))}
                </div>
                <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
            </form>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <div className="product-images">
                            {product.images.map((image, index) => (
                                <img key={index} src={image} alt={`Product ${index}`} />
                            ))}
                        </div>
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddPetsProduct;



