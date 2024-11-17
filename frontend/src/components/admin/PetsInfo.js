import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useService } from '../../service/ServiceProvider';

const PetsInfo = () => {
    const {PORT}=useService()
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        question: "",
        answer: "",
        images: []
    });

    const [editMode, setEditMode] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setForm((prevForm) => ({
            ...prevForm,
            images: files
        }));
    };

    const handleImageRemove = (index) => {
        setForm((prevForm) => {
            const updatedImages = prevForm.images.filter((_, i) => i !== index);
            return { ...prevForm, images: updatedImages };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData();

        // Append data to FormData
        for (const key in form) {
            if (Array.isArray(form[key])) {
                form[key].forEach((file) => productData.append(key, file));
            } else {
                productData.append(key, form[key]);
            }
        }


        try {
            if (editMode) {
                console.log("Editing product ID:", productIdToEdit); // Log ID to check
                const response = await axios.put(`${PORT}/api/route/updateinformation/${productIdToEdit}`, productData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productIdToEdit ? response.data : product
                    )
                );
                setEditMode(false);
                setProductIdToEdit(null);
            } else {
                const response = await axios.post(`${PORT}/api/route/add`, productData);
                console.log('API Response:', response.data);
                setProducts((prevProducts) => Array.isArray(prevProducts) ? [...prevProducts, response.data] : [response.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };

    const resetForm = () => {
        setForm({
            question: "",
            answer: "",
            images: []
        });
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${PORT}/api/route/getinformation`);
                setProducts(response.data.allInformation || []); // Ensure it defaults to an array
                console.log(response.data.allInformation)
            } catch (error) {
                setError('Error fetching products');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [form]);



    const handleDelete = (id) => {
        axios.delete(`${PORT}/api/route/deleteinformation/${id}`)
            .then(() => setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)))
            .catch((error) => console.error('Error deleting product:', error));
    };


    const handleEdit = (product) => {
        setForm({
            question: product.question,
            answer: product.answer,
            images: []
        });
        setProductIdToEdit(product._id);
        setEditMode(true);
    };


    return (
        <div className="overflow-scroll min-h-screen w-screen py-6 bg-gray-100 ">
            <form onSubmit={handleSubmit} className="m-auto w-[90%] md:max-w-[50%] overflow-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Add New Information</h2>

                {/* Question Field */}
                <div className="mb-4">
                    <label htmlFor="question" className="block mb-2">Question</label>
                    <input
                        type="text"
                        name="question"
                        placeholder="Enter question"
                        value={form.question}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Answer Field */}
                <div className="mb-4">
                    <label htmlFor="answer" className="block mb-2">Answer</label>
                    <textarea
                        name="answer"
                        placeholder="Enter answer"
                        value={form.answer}
                        onChange={handleInputChange}
                        rows="4"
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Images Upload */}
                <div className="mb-4">
                    <label className="text-gray-700 font-medium">Images</label>
                    <div className="flex mt-2 items-center border border-gray-300 rounded-md overflow-hidden">
                        <span className="flex-1 px-3 text-gray-500">Choose Images</span>
                        <label className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer" htmlFor="customFile">
                            Add
                        </label>
                        <input
                            type="file"
                            id="customFile"
                            name="images"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex w-full items-center gap-2 mt-3">
                        {form.images.map((pro, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(pro)}
                                    alt={`Image Preview ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleImageRemove(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
            <div className='px-5'>
                <h2 className="text-xl font-bold mt-6">Pets Info List</h2>
                <ul className="mt-4">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <li key={product._id} className="flex justify-between items-center mb-2 p-4 border-b">
                                <div>
                                    <h3 className="font-semibold">{product.question}</h3>
                                    <p>{product.answer}</p>
                                </div>
                                <div className='flex'>
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PetsInfo;
