import React from 'react'

import grouppuppies from '../../img/category/group-puppies.png'

const CategoryBanner = () => {
    return (
        <div className='Banner flex justify-between bg-red-500 flex-col md:flex-row   '>
            <div className="banner-box-1 w-full text-[#002A48]  flex flex-col items-center justify-center">
                <div className="md:max-w-[70%] w-full  flex flex-col md:items-center justify-center gap-3 px-[15px]  pt-[30px] pb-[10px] md:p-0 ">
                    <h1 className='font-extrabold text-3xl  md:text-5xl '>One More Friend</h1>
                    <h4 className='font-bold text-2xl md:text-3xl'>Thousands More Fun!</h4>
                    <small className='text-black max-w-[90%] font-medium '>Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!</small>
                    <div className="btn-group flex gap-3 ">
                        <button className='px-2 py-1 rounded-2xl w-[120px] md:w-[150px]  border-[1px] border-[#002A48]  '>
                            View intro
                        </button>
                        <button className='bg-[#002A48] text-white w-[120px] px-2 py-1 rounded-2xl md:w-[150px]   '>
                            Explore Now

                        </button>
                    </div>
                </div>
            </div>
            <div className="banner-box-2 w-full h-full  ">
                <img src={grouppuppies} alt="" className='w-full h-full md:mt-[160px] xl:mt-0' />
            </div>
        </div>
    )
}

export default CategoryBanner