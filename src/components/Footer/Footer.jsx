import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { MdOutlineMarkEmailUnread } from "react-icons/md";

export default function Footer() {

    return (
        <>
            <div className='w-full bg-[#6A7282] py-5   text-white '>
                <div className="justify-items-center md:justify-items-start grid grid-cols-1 md:grid-cols-2 gap-5  container max-w-[90%]  mb-6 sm:max-w-[36rem] md:max-w-[45rem] lg:max-w-[62rem]  xl:max-w-[74rem]  2xl:max-w-[88rem]  mx-auto">
                
                    <div>
                        <ul className='space-y-2'>
                            <li className='flex items-center gap-4 space-y-5 text-xl font-semibold'><FaMapMarkerAlt className='w-12 h-12 bg-gray-700 text-lg p-3 rounded-full'/>21 Revolution slreet <br/>parls france </li>
                            <li className='flex items-center gap-4 space-y-5 text-xl font-semibold'><FaPhoneAlt className='w-12 h-12 bg-gray-700 text-lg p-3 rounded-full'/>01555123456</li>
                            <li className='flex items-center gap-4 space-y-5 text-xl font-semibold'><MdOutlineMarkEmailUnread className='w-12 h-12 bg-gray-700 text-lg p-3 rounded-full'/>tec@gmail.com</li>
                        </ul>
                    </div>
                    <div className='w-full m-auto text-center md:text-start'>
                        <h2 className='font-bold text-xl'>About The Company</h2>
                        <p className='md:w-[70%] text-[#bebaba]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, obcaecati optiorerum accusantium aspernatur fuga aliquid. Dolorum animi reiciendis quos.</p>
                        <ul className='flex items-center gap-2.5 mt-4 justify-center  md:justify-start'>
                            <li className='w-12 h-12 bg-[#364153] hover:bg-[#232c3b] duration-300 cursor-pointer flex items-center justify-center rounded-full text-2xl'><FaFacebookF /></li>
                            <li className='w-12 h-12 bg-[#364153] hover:bg-[#232c3b] duration-300 cursor-pointer flex items-center justify-center rounded-full text-2xl'><FaTwitter /></li>
                            <li className='w-12 h-12 bg-[#364153] hover:bg-[#232c3b] duration-300 cursor-pointer flex items-center justify-center rounded-full text-2xl'><FaLinkedinIn /></li>
                            <li className='w-12 h-12 bg-[#364153] hover:bg-[#232c3b] duration-300 cursor-pointer flex items-center justify-center rounded-full text-2xl'><FaGithub /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
