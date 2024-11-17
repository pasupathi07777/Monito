import './PetAbout.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useService } from '../../service/ServiceProvider';


const PetAbout = () => {
    const {PORT}=useService()
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const navigate=useNavigate()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${PORT}/api/route/getinformation`);
                setProducts(response.data.allInformation || []); // Ensure it defaults to an array
                console.log(response.data.allInformation)
            } catch (error) {
                setError('Error Fetching PetsInfo');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='px-[10px] py-[10px] md:px-[60px] md:py-[20px] capitalize '>
            <small className='font-medium px-[10px]  '>Whats new?</small>
            <div className="collections-box1-1 flex justify-between capitalize items-center  px-[10px]  ">
                <h3 className='font-medium text-[#003459] '>take a look at some out of pets</h3>
                <button className='px-3 py-1 hidden sm:block   border-[2px] hover:bg-[#003459] hover:text-white rounded-2xl  border-[#003459] text-[#003459] ' onClick={()=>navigate("AnimalDetail")}>
                    view more
                </button>
            </div>
            <div className="pets-about grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2   ">
                {
                    products.slice(0,8).map((pro, index) => (
                        <div key={index} className="product flex flex-col   rounded-lg p-3 text-[12px] gap-1 " onClick={()=>navigate("AnimalDetail")}>
                            <img src={`data:image/jpeg;base64,${pro.images[0]}`} alt="" className='rounded-lg h-[150px] md:h-[200px]' />
                            <button className='px-2  rounded-2xl py-[2px] bg-[#0c8ce9] text-white capitalize  w-fit'>
                                pet knowledge
                            </button>
                            <p className="question font-medium">
                                {pro.question}
                            </p>
                            <p className="answer text-gray-600 ">
                                {pro.answer}
                            </p>
                        </div>
                    ))

                }

            </div>
        </div>
    )
}

export default PetAbout