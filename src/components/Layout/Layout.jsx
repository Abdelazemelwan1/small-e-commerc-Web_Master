import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './../Footer/Footer';

export default function Layout() {

    return (
        <>
            <NavBar />
             <div className="container max-w-[90%]  mb-6 sm:max-w-[36rem] md:max-w-[45rem] lg:max-w-[62rem]  xl:max-w-[74rem]  2xl:max-w-[88rem]  mx-auto mt-[100px]">

    <Outlet />
    </div>
            <Footer />
        </>
    )
}
