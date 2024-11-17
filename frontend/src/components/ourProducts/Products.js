import React, { useEffect, useState } from 'react'
import './Products.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useService } from '../../service/ServiceProvider'
const Products = () => {
    const {PORT}=useService()
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()
    useEffect(() => {
        axios.get(`${PORT}/api/products/getproduct`)
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
        <div className='products px-[10px] md:px-[60px] py-[20px] mt-2 '>
            {/* <small className='capitalize '>hard to choose right product for your pets?</small> */}
            <div className="box  flex justify-between text-[#003459] items-center capitalize">
                <h3 className='font-medium'>our products</h3>
                <button onClick={()=>navigate("OurProducts")} className='px-3 py-1 hidden sm:block   border-[2px] hover:bg-[#003459] hover:text-white rounded-2xl  border-[#003459] text-[#003459] '>
                    view more
                </button>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 mt-4  md:grid-cols-4 gap-4  ">
                {
                    products.slice(0,8).map((pro, index) => (
                        <div key={index} className=" flex flex-col gap-1  rounded-lg p-3 product" onClick={()=>navigate("OurProducts")}>
                            <img
                                src={`data:image/jpeg;base64,${pro.images[0]}`}
                                alt="" className='rounded-lg w-full h-[150px] md:h-[200px]' />
                            <h5 className='font-medium capitalize'>{pro.name.slice(0, 10)}...</h5>
                            <div className="details flex flex-col gap- text-[#6f7d81] capitalize ">
                                <small >
                                    Seller: {pro.seller}
                                </small>
                                <small>
                                    Quantity : {pro.quantity}gm
                                </small>

                            </div>
                            <div className="price font-medium">
                                ₹{pro.price}
                            </div>
                            <div className="gift font-medium hidden md:flex bg-[#fceed5] px-2 py-1 rounded-lg text-center capitalize  gap-2 items-center ">
                                <img src={products.gift} alt="" />
                                free toy and ree shake
                            </div>
                        </div>
                    ))

                }

            </div>

        </div>
    )
}

export default Products