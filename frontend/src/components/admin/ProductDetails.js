import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PetsDetails.css";
import { useService } from '../../service/ServiceProvider';

const ProductDetails = () => {
    const {PORT} =useService()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${PORT}/api/products/getproduct`)
                setProducts(response.data.allPets);
            } catch (error) {
                setError('Error fetching productDetails');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="h-screen overflow-y-auto p-4 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border p-4 rounded">
                        <img src={`data:image/jpeg;base64,${product.images[0]}`} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
                        <h3 className="text-xl font-semibold">Rs. {product.price}</h3>
                        <p>Seller: {product.seller}</p>
                        <p>Quantity: {product.quantity}gm</p>
                        <p>Stock: {product.stock}</p>
                        <p>Description: {product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;