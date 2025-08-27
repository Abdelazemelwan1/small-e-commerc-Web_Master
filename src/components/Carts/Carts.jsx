import React, { useContext, useEffect, useState } from 'react'
import Style from './Carts.module.css'
import { CartContext } from '../../ConText/CartContextProvider'
import { Link } from 'react-router-dom';
import { FaOpencart } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UseTitle from '../UseTitle/UseTitle';

export default function Carts() {
     UseTitle(' Cart');
    // let {cart} = useContext(CartContext)

     const { cart, addToCart, decreaseQty, removeFromCart ,clearCart ,totalItems , totalPrice} =
    useContext(CartContext);

    console.log(cart);
    
    useEffect(() => {
        AOS.init({duration: 1000})
    }, [])
    return (
        <>

<div className="min-h-[50vh] bg-gray-100  p-4 rela tive rounded-3xl gap-3">
<div className='flex items-center justify-between'>
    <Link to={"/"} className='mb-3 abso lute top-4 left-4 w-14 h-14 rounded-full border-2 border-[#2023d5]  z-20 flex items-center justify-center text-3xl'>🔙</Link>
<h2 className='text-xl font-bold text-[#2023d5] '>TotalPrice : {totalPrice.toFixed(2)} EGP </h2>
</div>
<div data-aos="zoom-in" className='flex flex-col items-center justify-center'>
{totalItems > 0 ? 


    <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-6 ">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({totalItems})</h2>
        <div className="space-y-4">

            {cart.map((item)=>
            <div key={item.id} className="flex items-center flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                <div className='flex gap-4'>

                    <img src={item.image} alt="Product" className="w-20  object-cover rounded-md" />
                    <div className="flex-1 ">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-3 md:line-clamp-2">{item.description}</p>
                    </div>
                </div>
                <div className='flex  gap-4'>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => decreaseQty(item.id)}
                            className="bg-gray-300 px-2 rounded cursor-pointer"
                            >
                            ➖
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                            onClick={() => addToCart(item)}
                            className="bg-gray-300 px-2 rounded cursor-pointer"
                            >
                            ➕
                        </button>
                    </div>

                    <p className="font-semibold text-gray-900 w-full md:w-22 text-right pr-2">{item.price * item.quantity} EGP</p>
                    
                    <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white px-2 rounded cursor-pointer"
                            >
                            🗑️
                    </button>
                </div>
            </div>
            )}

  <button
              onClick={clearCart}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer m-auto text-center block"
            >
              🧹 Delet All
            </button>

            {/* Summary */} 
            <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-base text-gray-900 mb-2">
                    <p>Subtotal</p>
                    <p className="font-semibold">{totalPrice.toFixed(2)} EGP</p>
                </div>
                <div className="flex justify-between text-base text-gray-500 mb-4">
                    <p className='text-[#6366F1]'>Shipping</p>
                    <p className='text-[#6366F1]'>Free</p>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                    <p>Total</p>
                    <p>{totalPrice.toFixed(2)} EGP</p>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
                Checkout
                </button>
            </div>

        </div>


</div>: <div className='text-center'>
<p className='mb-5'>There are no additional products</p>
<Link to={"/"} className='bg-[#6366F1] text-white px-2 py-1.5 mt-2 rounded-lg flex justify-center items-center gap-3 text-2xl duration-300 hover:bg-[#2427d1]'> <FaOpencart className='text-3xl'/>Add to Cart</Link>
</div> }
</div>
    </div>

        </>
    )
}
