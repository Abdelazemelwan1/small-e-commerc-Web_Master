import React, { useContext, useEffect, useState } from 'react'
import Style from './Home.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { FaOpencart } from 'react-icons/fa'
import Lottie from 'lottie-react';
import loooding from "./../../Looging/looding.json"
import { CiHeart } from 'react-icons/ci';
import { BiCartAlt } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import { CartContext } from '../../ConText/CartContextProvider'
import AOS from 'aos';
import 'aos/dist/aos.css';
import UseTitle from '../UseTitle/UseTitle'
 
export default function Home() {
    let {addToCart} = useContext(CartContext)
     UseTitle('Product');
    
    let [searchType , setSearchType] = useState("Search By Title")
    const [query, setQuery] = useState("");
    
    function getPlaceholder() {
        if (searchType === "Search By Title") {
            return "Enter Product Title ..."
        } else if(searchType === "Search By Category") {
            return "Enter Product Categoryitle ..."
            
        }
    }
    
    async function displayProducts() {
        return await axios.get("https://fakestoreapi.com/products")
    }
    
    let {data , isLoading } = useQuery({
        queryKey:["product"],
        queryFn: displayProducts
    })

    // 👇 Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // حساب البداية والنهاية
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil((data?.data.length || 0) / itemsPerPage);
    
    // فلترة المنتجات على حسب الـ searchType
    const filteredProducts = currentItems?.filter((product) => {
    if (searchType === "Search By Title") {
        return product.title.toLowerCase().includes(query.toLowerCase());
    } else if (searchType === "Search By Category") {
        return product.category.toLowerCase().includes(query.toLowerCase());
    }
    return true;
    });

        useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);


        useEffect(() => {
        AOS.init({duration: 1000})
    }, [])
    if (isLoading) {
        return <div><Lottie className='h-screen' animationData={loooding} /></div>
    }


    return (
        <>
            <div className="grid grid-cols-2 gap-4 my-10">
                <div>
                    <select value={searchType} 
                        onChange={(e) => setSearchType(e.target.value)} 
                        id="list" className="w-full outline-[#6366F1] border-3 border-[#6366F1] rounded-lg h-11 px-3 text-[#6366F1] font-semibold text-xs md:text-lg" >
                        <option value="Search By Title">Search By Title</option>
                        <option value="Search By Category">Search By Category</option>
                    </select>
                </div>

                <div>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={getPlaceholder()}
                        className="w-full outline-[#6366F1] border-3 border-[#6366F1] rounded-lg h-11 px-3 text-[#6366F1] font-semibold text-xs md:text-lg"
                    />
                </div>
            </div>

            <div  className='grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {filteredProducts?.map((prodct)=><div  key={prodct.id}>

                    <div data-aos="fade-up" className="group relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white dark:bg-gray-900 bg-clip-border text-gray-700 shadow-lg">
                        <div className=" relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                            <header className='relative group'>
                                <img className='h-[350px] m-auto bg-center bg-cover blur-xs dark:blur-none group-hover:blur-none group-hover:scale-110 duration-400 cursor-pointer' src={prodct.image} alt="ui/ux review check" />
                                <div className="z-10 layer flex-col p-2  -translate-x-1/2 flex justify-center items-center gap-2 absolute  top-1/4 right-[-20px] -translate-y-1/2">
                                <div   className='dark:bg-[#818CF8] dark:text-gray-900  icon text-3xl p-1.5 w-[45px] h-[45px] flex items-center justify-center  rounded-full text-white opacity-0 translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 bg-[#6366F1] hover:bg-[#2a2dd7] duration-300 cursor-pointer'>
                                    <CiHeart />
                                </div>
                                <div onClick={() => {
                                    addToCart(prodct)}}  className='dark:bg-[#818CF8] dark:text-gray-900  icon text-3xl p-1.5 w-[45px] h-[45px] flex items-center justify-center  rounded-full text-white opacity-0 translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 bg-[#6366F1] hover:bg-[#2a2dd7] duration-700 cursor-pointer'>
                                    <FaOpencart />
                                </div>
                                
                                <div className='dark:bg-[#818CF8] dark:text-gray-900  icon text-3xl p-1.5 w-[45px] h-[45px] flex items-center justify-center  rounded-full text-white opacity-0 translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 bg-[#6366F1] hover:bg-[#2a2dd7] duration-1000 cursor-pointer'>
                                    <Link to={`productdetails/${prodct.id}/${prodct.category}`}> <IoEyeOutline /></Link>
                                </div>
                                </div>
                            </header>
                        </div>
                        <div className="p-6">
                            <h5 className="dark:text-white font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased line-clamp-1">
                            {prodct.title}
                            </h5>
                            <p className="dark:text-white line-clamp-3 font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                                {prodct.description}
                            </p>
                            <div className="mb-3 flex items-center justify-between">
                                <h5 className="text-[#6366F1] dark:text-[#A5B4FC] capitalize font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased line-clamp-1">
                                {prodct.category}
                                </h5>
                                <p className="dark:text-white flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-mt-0.5 h-5 w-5 text-yellow-700">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                {prodct.rating.rate}
                                </p>
                            </div>
                            <div className="mb-3 flex items-center justify-between">
                                <p className="flex items-center gap-1.5 font-sans text-base  font-normal leading-relaxed text-blue-gray-900 antialiased">
                                <span className='text-red-500 font-bold lg:font-medium line-through'> {prodct.price + 80} EGP </span><span className='text-[#6366F1] font-bold'> {prodct.price} EGP </span>
                                
                                </p>
                                <h5 className="text-[#6366F1] dark:text-[#A5B4FC] capitalize font-sans text-md md:text-sm font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                                Available Quantity : {prodct.rating.count}
                                </h5>
                            </div>
                        </div>
                        
                        <div className="p-6 pt-3">
                            <button type="button" onClick={()=> addToCart(prodct)} className="dark:bg-[#818CF8] dark:text-gray-900 flex justify-center items-center gap-3 cursor-pointer  w-full select-none rounded-lg bg-[#6366F1]  py-3.5 px-7 text-center align-middle font-sans text-md font-bold capitalize text-white shadow-md shadow-[#6366F1]/20 transition-all hover:shadow-lg hover:shadow-[#6366F1]/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" data-ripple-light="true">
                                <FaOpencart  className='text-2xl'/> Add To Cart
                            </button>
                        </div>
                    </div>

                </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 gap-2">

            {/* زر السهم الشمال */}   
                <button
                    onClick={() => {setCurrentPage((prev) => Math.max(prev - 1, 1));}}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg border flex items-center justify-center ${
                    currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed  dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                    ◀️ Prev
                </button>

            {/* أزرار الصفحات */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => {setCurrentPage(index + 1)}}
                    className={`dark:bg-[#818CF8] dark:text-gray-900  cursor-pointer px-4 py-2 rounded-lg border ${
                        currentPage === index + 1
                        ? "bg-[#6366F1] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-300"
                    }`}
                    >
                        {index + 1}
                    </button>
                ))}

            {/* زر السهم اليمين */}
                <button onClick={() => {setCurrentPage((prev) => Math.min(prev + 1, totalPages))}}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg border flex items-center justify-center ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed  dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                    Next ▶️  
                </button>
            </div>
        </>
    )
}







