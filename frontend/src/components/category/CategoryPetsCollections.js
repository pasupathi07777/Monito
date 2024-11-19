import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../category/CategoryPetsCollections.css';
import { useNavigate } from 'react-router-dom'
import {useService} from '../../service/ServiceProvider'

const CategoryPetsCollections = () => {
    const {PORT}=useService()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${PORT}/api/animal/getanimals`)
            .then((response) => {
                setProducts(response.data.allPets);
                console.log(response.data.allPets)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='collections flex flex-col gap-1 px-[10px] py-[10px] md:px-[60px] md:py-[20px]'>
            <div className="pets-collections grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2  ">
                {
                    products.slice(0,8).reverse().map((data, index) => (
                        <div key={data._id} className="product  rounded-lg p-3"
                            onClick={() => navigate(`/Details/${data._id}`)}>
                            <img
                                src={`data:image/jpeg;base64,${data.images[0]}`}
                                alt="" className='rounded-lg w-full h-[150px] md:h-[200px] ' />
                         
                          
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default CategoryPetsCollections;



