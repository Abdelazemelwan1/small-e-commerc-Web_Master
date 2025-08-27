import React, { useContext, useEffect, useState } from 'react'
import Style from './NavBar.module.css'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, HeartIcon, ShoppingBagIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import GoogleLogo from './../../assets/png-transparent-technion-israel-institute-of-technology-weizmann-institute-of-science-school-technology-electronics-text-logo-thumbnail.png';
// import  HeartIcon,{ HeartIcon } from '@heroicons/react/16/solid';
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import { authContext } from '../../ConText/AuthContextProvider';
import { CartContext } from '../../ConText/CartContextProvider';


export default function NavBar() {
    let {totalItems } = useContext(CartContext)
    let {token ,setToken, name ,setName} = useContext(authContext)
  const [isOpen, setIsOpen] = useState(false);
const [wishlistCount, setWishlistCount] = useState(1);
  // const [cartCount, setCartCount] = useState(15);
    const [menuOpen, setMenuOpen] = useState(false); // المينيو في الموبايل

    function logout() {
        setToken(null)
        localStorage.removeItem("token")
        setName(null)
        localStorage.removeItem("name")

    }
    


    return (
        <>

          <nav className="bg-gray-500 text-white px-6 py-4 flex items-center justify-between z-50  fixed top-0 left-0 ring-0 w-full">
      {/* الشمال: Logo */}
      <Link to={"/"} className="text-3xl font-bold  tracking-[1px] text-[#6366F1]">TEC</Link>

      {/* النص في النص (متمركز في النص بالظبط) */}
      {token ?   <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold capitalize"> {localStorage.getItem("name") ? "Welcom" +" " + name : null}</div> : null}
    

      {/* اليمين: أيقونات أو زرار المينيو */}
      <div className="flex items-center gap-4">
        {/* للـ Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {token && <>
          {/* Wishlist */}
          <div className="relative cursor-pointer">
            <HeartIcon className="w-7 h-7 hover:text-gray-200" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Cart */}
          <Link to={"/carts"} className="relative cursor-pointer">
            <ShoppingCartIcon className="w-7 h-7 hover:text-gray-200" />
            {totalItems > 0 ? (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            ) :   <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>}
          </Link>
</>}
          {/* صورة البروفايل */}
          <div className="relative">
            <img
              src="data:image/jpeg;base64,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"
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setIsOpen(!isOpen)}
            />

            {/* Dropdown */}
            {isOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40 z-50">
                {token ? <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link onClick={()=>logout()}  to={"/Login"}>Logout</Link></li> : <>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={"/Login"}>Login</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={"/Register"}>Register</Link></li>
                </>}
                
              </ul>
            )}
          </div>
        </div>

        {/* للـ Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* المينيو بتاعة الموبايل */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black shadow-lg rounded-md md:hidden z-50">
          <ul className="flex flex-col gap-2 p-4">
            {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
              هلو أبد العظيم
            </li> */}
            {token && <>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer relative">
              <HeartIcon className="w-6 h-6" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="absolute right-6 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </li>
            <Link to={"/carts"} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer relative">
              <ShoppingCartIcon className="w-6 h-6" />
              Cart
              {totalItems > 0 ? (
              <span className="absolute -top-2 right-6 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            ) :   <span className="absolute top-2 -right-6 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>}
            </Link>
</>}
            {token ? <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link onClick={()=>logout()} to={"/Login"}>Logout</Link></li> : <>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={"/Login"}>Login</Link></li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={"/Register"}>Register</Link></li>
            </>}
            
          </ul>
        </div>
      )}
    </nav>
        </>
    )
}
