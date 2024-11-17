import React from 'react'
import './Sellers.css'
import sellers from '../../data/sellers'


const Sellers = () => {
    return (
        <div className='px-[10px] md:px-[60px]'>
            <div className="flex justify-between text-[#003459] items-center  ">
                <div className="flex gap-0 capitalize  flex-col ">
                    <p className='text-black text-[14px] '>product to be a part of</p>
                    <h3 className='font-semibold text-[20px] '>pet sellers</h3>
                </div>
                {/* <button className='px-2 py-1 border-[#003459] capitalize border-[1px] rounded-2xl  ' >
                    view all our sellers >
                </button> */}
            </div>
            <div className="sellers-logo grid grid-cols-4 sm:grid-cols-7">
                {
                    sellers.sellersImg.map((sell,index)=>(
                        <img key={index} src={sell} alt="" />
                        
                        
                    ))
                }


            </div>
        </div>
    )
}

export default Sellers