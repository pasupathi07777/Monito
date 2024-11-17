import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useService } from '../../service/ServiceProvider';

const AddPets = () => {
    const {PORT}=useService()
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        SKU: '',
        name: '',
        animalType: '',
        breadType: '',
        price: '',
        image: [],
        gender: '',
        age: '',
        ageUnit: '',
        size: '',
        color: '',
        vaccinated: false,
        dewormed: false,
        phoneNumber: "",
        location: '',
        additionalInfo: ''
    });


    const [editMode, setEditMode] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setForm((prevForm) => ({
            ...prevForm,
            image: [...(prevForm.image || []), ...newFiles], // Merge existing images with new ones
        }));
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
                const response = await axios.put(`${PORT}/api/animal/updateanimal/${productIdToEdit}`, productData, {
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
                const response = await axios.post(`${PORT}/api/animal/add`, productData);
                setProducts((prevProducts) => [...prevProducts, response.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };




    const resetForm = () => {
        setForm({
            SKU: '',
            name: '',
            animalType: '',
            breadType: '',
            price: '',
            image: [],
            gender: '',
            age: '',
            ageUnit: '',
            size: '',
            color: '',
            vaccinated: false,
            dewormed: false,
            phoneNumber: '',
            location: '',
            publishedDate: '',
            additionalInfo: ''
        });
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${PORT}/api/animal/getanimals`);
                setProducts(response.data.allPets);
            } catch (error) {
                setError('Error fetching products');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [form])


    const handleDelete = (id) => {
        axios.delete(`${PORT}/api/animal/deleteanimal/${id}`)
            .then(() => setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)))
            .catch((error) => console.error('Error deleting product:', error));
    };


    const handleEdit = (product) => {
        setForm({
            SKU: product.SKU,
            name: product.name,
            price: product.price,
            animalType: product.animalType,
            breadType: product.breadType,
            image: [], // Resetting this to manage uploads separately
            gender: product.gender,
            age: product.age,
            ageUnit: product.ageUnit,
            size: product.size,
            color: product.color,
            vaccinated: product.vaccinated,
            dewormed: product.dewormed,
            phoneNumber: product.phoneNumber,
            location: product.location,
            additionalInfo: product.additionalInfo
        });
        setProductIdToEdit(product._id);
        setEditMode(true);
    };


    const handleImageRemove = (index) => {
        setForm((prevForm) => {
            const updatedImages = prevForm.image.filter((_, i) => i !== index);
            return { ...prevForm, image: updatedImages };
        });
    };

    return (
        <div className="overflow-scroll min-h-screen w-screen py-6 bg-gray-100 ">
            <form onSubmit={handleSubmit} className="m-auto w-[90%] md:max-w-[50%] overflow-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Add New Adoption</h2>

                <div className="mb-4">
                    <label htmlFor="SKU" className="block mb-2">SKU</label>
                    <input
                        type="text"
                        name="SKU"
                        placeholder="SKU"
                        value={form.SKU}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Animal Type Input */}
                <div className="mb-4 w-full">
                    <label htmlFor="animalType" className="block mb-2 text-gray-700 font-medium">
                        Animal Type
                    </label>
                    <select
                        id="animalType"
                        name="animalType"
                        value={form.animalType} // Ensure form.animalType holds the current type
                        onChange={handleInputChange} // Update this to handle the change
                        className="border w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select an animal type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Fish">Fish</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="breadType" className="block mb-2">Bread Type</label>
                    <input
                        type="text"
                        name="breadType"
                        placeholder="Enter Bread Type"
                        value={form.breadType}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="gender" className="block mb-2">Gender</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>






                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2">Age</label>
                    <div className="flex gap-3">

                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={form.age}
                            onChange={handleInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            name="ageUnit"
                            value={form.ageUnit}
                            onChange={handleInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                        </select>
                    </div>
                </div>



                <div className="mb-4">
                    <label htmlFor="size" className="block mb-2">Size</label>
                    <select
                        name="size"
                        value={form.size}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                {/* Location Input */}
                <div className="mb-4">
                    <label htmlFor="location" className="block mb-2">Location (Select State)</label>
                    <select
                        name="location"
                        value={form.location}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select State</option> {/* Placeholder option */}
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Tamil Nadu - Chennai">Chennai</option>
                        <option value="Tamil Nadu - Coimbatore">Coimbatore</option>
                        <option value="Tamil Nadu - Madurai">Madurai</option>
                        <option value="Tamil Nadu - Tiruchirappalli">Tiruchirappalli</option>
                        <option value="Tamil Nadu - Salem">Salem</option>
                        <option value="Tamil Nadu - Tirunelveli">Tirunelveli</option>
                        <option value="Tamil Nadu - Erode">Erode</option>
                        <option value="Tamil Nadu - Vellore">Vellore</option>
                        <option value="Tamil Nadu - Kanyakumari">Kanyakumari</option>
                        <option value="Tamil Nadu - Thanjavur">Thanjavur</option>
                        <option value="Tamil Nadu - Dindigul">Dindigul</option>
                        {/* Add more states or districts as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="color" className="block mb-2">Color</label>
                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={form.color}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>




                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="vaccinated"
                        checked={form.vaccinated}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    <label className="ml-2 block text-gray-700 font-medium">
                        Vaccinated
                    </label>
                </div>


                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="dewormed"
                        checked={form.dewormed}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    <label className="ml-2 block text-gray-700 font-medium">
                        Dewormed
                    </label>
                </div>



                <div className="mb-4">
                    <label htmlFor="number" className="block mb-2">Mobile Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Mobile Number"
                        value={form.phoneNumber}
                        onChange={(e) => {

                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                                handleInputChange(e);
                            }
                        }}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="additionalInfo" className="block mb-2">Additional Info</label>
                    <textarea
                        name="additionalInfo"
                        placeholder="Additional Information"
                        value={form.additionalInfo}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>


                <div className="mb-4">
                    <label className="text-gray-700 font-medium">Images</label>
                    <div className="flex mt-2 items-center border border-gray-300 rounded-md overflow-hidden">
                        <span className="flex-1 px-3 text-gray-500">Choose Image</span>
                        <label className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer" htmlFor="customFile">
                            Add
                        </label>
                        <input
                            type="file"
                            id="customFile"
                            name="image"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex w-full items-center gap-2 mt-3">
                        {form.image.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`Image Preview ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <button
                                    onClick={() => handleImageRemove(index)}
                                    className="absolute top-1 right-1  bg-red-500 text-white text-xs  w-4 h-4 flex justify-center items-center  rounded-full"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>

            <div className='px-5'>
                <h2 className="text-xl font-bold mt-6">Product List</h2>
                <ul className="mt-4">
                    {products.map((product) => (
                        <li key={product._id} className="flex justify-between items-center mb-2 p-4 border-b">
                            <div>
                                <h3 className="font-semibold">{product.name}</h3>
                                <p>SKU: {product.SKU}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default AddPets;



