
import React from 'react'
import './FriendBanner.css'
import banner from '../../data/banner'

const FriendBanner = () => {
  return (
    <div className="px-[10px] md:px-[60px] rounded-2xl overflow-hidden">
      <div className='Banner-friend flex justify-between flex-col md:flex-row w-full rounded-2xl   '>

        <div className="banner-box-2 w-full h-full order-2 md:order-1   ">
          <img src={banner.adoptDog} alt="" color='w-full h-full' />
        </div>

        <div className="banner-box-1 w-full text-[#002A48]  flex flex-col items-center justify-center order-1 md:order-2">
          <div className="md:max-w-[70%] w-full  flex flex-col items-center justify-center gap-3 px-[15px]  pt-[30px] pb-[10px] md:p-0 ">
            <h1 className='font-extrabold text-3xl  md:text-4xl '>One More Friend</h1>
            <h4 className='font-bold text-2xl md:text-2xl'>Thousands More Fun!</h4>
            <small className='text-black max-w-[90%] font-medium '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, et?</small>
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

      </div>
    </div>

  )
}

export default FriendBanner