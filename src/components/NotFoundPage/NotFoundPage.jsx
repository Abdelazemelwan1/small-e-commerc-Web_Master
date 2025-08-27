import React, { useEffect, useState } from 'react'
import Style from './NotFoundPage.module.css'
import Lottie from 'lottie-react';
import loooding from "./../../Looging/Page Not Found 404.json"
export default function NotFoundPage() {

    return (
        <>
          
         <div><Lottie className='h-[83vh]' animationData={loooding} />
         
         </div>
    
        </>
    )
}
