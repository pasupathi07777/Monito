import React from 'react'
import navData from '../../data/nav'
import facebook from "../../img/footer/Facebook.png"
import instagram from "../../img/footer/Instagram.png"
import twitter from "../../img/footer/Twitter.png"
import youtube from "../../img/footer/Youtube.png"


const Footer = () => {
    return (
        <footer className='footer bg-[#fdecce] px-[10px] md:px-[60px] py-[30px] md:py-[50px]    '>
            <div className="footer-box p-[20px] bg-[#003459] rounded-2xl flex flex-col md:flex-row gap-2 items-center  ">
                <p className='fonr-bold text-white w-fit capitalize '>Register Now So You Don't Miss Our Program </p>
                <div className="input p-[20px] bg-white w-full rounded-2xl flex gap-2 flex-col md:flex-row   ">
                    <input type="text" className='border-gray-500 focus:outline-none border-[1px] w-full rounded-lg  py-2 px-2 ' placeholder='Enter your Email' />
                    <button className='bg-[#003459] md:w-[200px] rounded-lg py-2  text-white capitalize '>Subcribe Now </button>
                </div>

            </div>
            <div className="footer-nav capitalize flex  justify-between items-center border-b-[1px] mt-1 border-gray-300 py-[50px]  flex-col md:flex-row  gap-2 ">
                <ul className='flex gap-5 font-medium '>
                    <li>home</li>
                    <li>category</li>
                    <li>about</li>
                    <li>contact</li>
                </ul>
                <div className="icon-group flex gap-12 " >
                    <img src={facebook} alt="facebook" />
                    <img src={twitter} alt="facebook" />
                    <img src={instagram} alt="facebook" />
                    <img src={youtube} alt="facebook" />
                </div>

            </div>
            <div className="copy-rights flex justify-between items-center pt-[60px]  text-gray-500 flex-col md:flex-row gap-3 ">
                <p className=' capitalize order-2 md:order-1 mt-3 md:mt-0'>© 2022 Monito. all right reserved.</p>
                <div className="logo order-1 md:order-2 ">
                    <img src={navData.logoImage} alt="" />
                </div>
                <div className="term flex  gap-5 order-3 ">
                    <p>Teams of Service </p>
                    <p>Privacy Policy</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer