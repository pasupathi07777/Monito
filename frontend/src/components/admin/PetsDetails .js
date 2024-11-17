import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PetsDetails.css";
import { useService } from '../../service/ServiceProvider';

const PetsDetails = () => {
    const {PORT}=useService()
    const [products, setProducts] = useState([]);
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
                        <h3 className="text-2xl font-semibold">{product.name || 'Unnamed Animal'}</h3>
                        <p className="text-base font-semibold">Rs. {product.price || 'N/A'}</p>
                        <p>SKU: {product.SKU || 'N/A'}</p>
                        <p>Gender: {product.gender || 'N/A'}</p>
                        <p>Age: {product.age || 'N/A'}</p>
                        <p>Size: {product.size || 'N/A'}</p>
                        <p>Color: {product.color || 'N/A'}</p>
                        <p>Vaccinated: {product.vaccinated ? 'Yes' : 'No'}</p>
                        <p>Dewormed: {product.dewormed ? 'Yes' : 'No'}</p>
                        <p>Cert: {product.cert || 'N/A'}</p>
                        <p>Location: {product.location || 'N/A'}</p>
                        <p>Published Date: {product.publishedDate ? new Date(product.publishedDate).toLocaleDateString() : 'N/A'}</p>
                        <p>Additional Information: {product.additionalInfo || 'No additional information'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetsDetails;


