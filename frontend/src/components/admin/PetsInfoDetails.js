import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PetsDetails.css";

const PetsInfoDetails = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/route/getinformation');
                setProducts(response.data.allInformation);
            } catch (error) {
                setError('Error fetching products');
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
                        <img src={`data:image/jpeg;base64,${product.images[0]}`} alt={product.name || 'Animal Image'} className="w-full h-64 object-cover mb-4 rounded" />
                        <h3 className="font-medium">{product.question}</h3>
                        <p className="text-gray-500">{product.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetsInfoDetails;