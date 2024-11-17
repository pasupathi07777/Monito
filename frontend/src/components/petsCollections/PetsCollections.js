import React, { useState, useEffect } from 'react'
import './PetsCollections.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '../nav/Navbar';


const PetsCollections = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5000/api/animal/getanimals')
            .then((response) => {
                console.log(response.data.allPets);
                setProducts(response.data.allPets);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (

        <div className='collections flex flex-col gap-1 px-[10px] py-[10px] md:px-[60px] md:py-[20px]  '>
           
            <small className='font-medium px-[10px]  '>Whats new?</small>
            <div className="collections-box1-1 flex justify-between capitalize items-center  px-[10px]  ">
                <h3 className='font-medium text-[#003459] '>take a look at some out of pets</h3>
                <button className='px-3 py-1 hidden sm:block   border-[2px] hover:bg-[#003459] hover:text-white rounded-2xl  border-[#003459] text-[#003459] ' onClick={()=>navigate("more")}>
                    view more
                </button>
            </div>
            <div className="pets-collections grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2  ">
                {
                    products.slice(0,8).map((data, index) => (
                        <div key={data._id} className="product  rounded-lg p-3"
                            onClick={() => navigate(`more`)}>
                            <img
                                src={`data:image/jpeg;base64,${data.images[0]}`}
                                alt="" className='rounded-lg w-full h-[150px] md:h-[200px] ' />

                            <h5>{data.name}</h5>
                            <div className="details flex flex-col ">
                                <small>
                                    Genter : {data.gender}
                                </small>
                                <small>
                                    Age :{` ${data.age} ${data.ageUnit}`}
                                </small>

                            </div>

                            <div className="price mt-1 text-base font-medium">
                                ₹{data.price}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PetsCollections