import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaOpencart } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loooding from "./../../Looging/looding.json"
import { CiHeart } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Autoplay, Pagination } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../../ConText/CartContextProvider';
import UseTitle from '../UseTitle/UseTitle';


export default function ProductDetails() {
     UseTitle('Product | Detalis');
        let {addToCart} = useContext(CartContext)
    
    let {id ,category} = useParams()
    async function getProductDetails(id) {
        return await axios.get(`https://fakestoreapi.com/products/${id}`)
    }
    let {data , isLoading} = useQuery({
        queryKey:["productDetails" , id],
        queryFn :()=> getProductDetails(id),
        enabled: !!id,
        

    })

    async function displayProducts(category) {
        let {data} = await axios.get("https://fakestoreapi.com/products");
        let newProduct = data?.filter((product)=>{
            return product.category == category
        })
        return newProduct
        
    }

    let forItem = useQuery({
        queryKey:["productDetailsall", category ],
        queryFn:()=> displayProducts(category),
         enabled: !!category,
         
    })

    useEffect(() => {
        AOS.init({duration: 2000})
    }, [])

    if (isLoading) {
        return <div><Lottie className='h-screen' animationData={loooding} /></div>
    }

    return (
        <>

            <div>
            <div className=" m in-w-screen min-h-screen bg-[#6366F1] dark:bg-[#434769] rounded-2xl  flex items-center p-5 lg:p-10 overflow-hidden relative">
                <Link to={"/"} className='absolute top-12 left-12 w-14 h-14 rounded-full border-2 border-[#2023d5] dark:border-[#818CF8] z-20 flex items-center justify-center text-3xl'>🔙</Link>
                <div className="w-full max-w-6xl rounded bg-white dark:bg-gray-900  shadow-xl p-10  mx-auto text-gray-800 relative md:text-left">
                    <div className="md:flex items-center -mx-10">
                        <div data-aos="fade-right" className="w-full md:w-1/2 px-4 md:px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img src={data?.data?.image} className="w-full relative z-10" alt="" />
                            <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0" />
                        </div>
                        </div>
                        <div data-aos="fade-left" className="w-full md:w-1/2 px-5">
                        <div className="mb-5">
                            <h1 className="font-bold uppercase text-2xl mb-5 dark:text-white">{data?.data?.title}</h1>
                            <p className="text-sm dark:text-white">{data?.data?.description}<a  className="cursor-pointer opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right" /></a></p>
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <h3 className='font-bold text-xl capitalize text-[#2023d5] dark:text-[#7181d0] '>{data?.data.category}</h3>
                            <p className='dark:text-white'>🌟{data?.data?.rating.rate}</p>
                        </div>
                        <div>
                            <div className="inline-block align-bottom mr-5">
                            <span className="text-lg md:text-2xl leading-none align-baseline line-through text-red-500">{data?.data?.price + 80 } EGP</span>
                            <span className="font-bold text-xl md:text-3xl leading-none align-baseline dark:text-white">{data?.data?.price}</span>
                            <span className="text-2xl leading-none align-baseline dark:text-white">EGP</span>
                            </div>
                            <div className='flex items-center justify-between mt-4'>
                                <p className='bg-red-600 py-1 px-2 rounded-xl text-white text-md'>count : {data?.data?.rating.count}</p>

                                <div className="align-bottom flex justify-center  lg:justify-start">
                                <button onClick={() => { addToCart(data?.data)}}  className= "dark:bg-[#818CF8] dark:text-gray-900  bg-[#6366F1] opacity-75 duration-500 hover:opacity-100 text-white hover:text-white rounded-full px-5 md:px-10 py-2 font-semibold cursor-pointer flex items-center justify-center gap-3"><FaOpencart  className='text-2xl'/> BUY NOW</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                <Link title="Buy me a beer" to={"/"} target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                    <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg" />
                </Link>
                </div>
            </div>
            </div>

            <h2 className='mt-10  text-center m-auto font-bold w-fit  py-4 text-xl border-4 border-transparent border-b-[#6063EA] dark:border-b-[#404465]  mb-4  px-2 dark:text-white'> products {category}</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}

                pagination={{
                clickable: true,
                }}
                breakpoints={{
                500: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1250: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                }}
                modules={[Pagination 
                // , Autoplay
                ]}
                className="mySwiper"
            >
                
                <div  className='grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
                    {forItem.data?.map((prodct)=>
                        <SwiperSlide>
                            
                            <div  key={prodct.id}>
                                
                                <div className="  dark:bg-gray-900 group relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                                    <div className=" relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                                        <header className='relative group'>
                                            <img className='h-[350px] m-auto bg-center bg-cover  group-hover:scale-110 duration-400 cursor-pointer' src={prodct.image} alt="ui/ux review check" />
                                            <div className="z-10 layer flex-col p-2  -translate-x-1/2 flex justify-center items-center gap-2 absolute  top-1/4 right-[-20px] -translate-y-1/2">
                                            <div   className='dark:bg-[#818CF8] dark:text-gray-900 icon text-3xl p-1.5 w-[45px] h-[45px] flex items-center justify-center  rounded-full text-white opacity-0 translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 bg-[#6366F1] hover:bg-[#2a2dd7] duration-300 cursor-pointer'>
                                                <CiHeart />
                                            </div>
                                            <div onClick={() => {addToCart(prodct)}}  className='dark:bg-[#818CF8] dark:text-gray-900 icon text-3xl p-1.5 w-[45px] h-[45px] flex items-center justify-center  rounded-full text-white opacity-0 translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 bg-[#6366F1] hover:bg-[#2a2dd7] duration-700 cursor-pointer'>
                                                <FaOpencart />
                                            </div>
                                            <div className='dark:bg-[#818CF8] dark:text-gray-900 icon text-3xl p-1.5 w-[45px] h-[45px] flex items-center justify-center  rounded-full text-white opacity-0 translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 bg-[#6366F1] hover:bg-[#2a2dd7] duration-1000 cursor-pointer'>
                                                <Link to={`/productdetails/${prodct.id}/${prodct.category}`}> <IoEyeOutline /></Link>
                                            </div>
                                            </div>
                                        </header>
                                    </div>
                                    <div className="p-6">
                                        <h5 className="dark:text-white  font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased line-clamp-1">
                                        {prodct.title}
                                        </h5>
                                        <p className="dark:text-white  line-clamp-3 font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                                            {prodct.description}
                                        </p>
                                        <div className="mb-3 flex items-center justify-between">
                                            <h5 className="text-[#6366F1] dark:text-[#A5B4FC]  capitalize font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased line-clamp-1">
                                            {prodct.category}
                                            </h5>
                                            <p className="dark:text-white  flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-mt-0.5 h-5 w-5 text-yellow-700">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                            {prodct.rating.rate}
                                            </p>
                                        </div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <p className="flex items-center gap-1.5 font-sans text-base  font-normal leading-relaxed text-blue-gray-900 antialiased">
                                            <span className='text-red-500 font-bold lg:font-medium line-through'> {prodct.price + 80} EGP </span><span className='text-[#6366F1] dark:text-[#A5B4FC] font-bold'> {prodct.price} EGP </span>
                                            
                                            </p>
                                            <h5 className="text-[#6366F1] dark:text-[#A5B4FC] capitalize font-sans text-md md:text-sm font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                                            Available Quantity : {prodct.rating.count}
                                            </h5>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 pt-3">
                                        <button onClick={() => {addToCart(prodct)}}  className="dark:bg-[#818CF8] dark:text-gray-900 flex justify-center items-center gap-3 cursor-pointer  w-full select-none rounded-lg bg-[#6366F1] py-3.5 px-7 text-center align-middle font-sans text-md font-bold capitalize text-white shadow-md shadow-[#6366F1]/20 transition-all hover:shadow-lg hover:shadow-[#6366F1]/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" data-ripple-light="true">
                                            <FaOpencart  className='text-2xl'/> Add To Cart
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </SwiperSlide>
                    )}
                </div>
            </Swiper>
        </>
    )
}
