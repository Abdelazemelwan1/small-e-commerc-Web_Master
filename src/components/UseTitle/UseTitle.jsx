import React, { useEffect, useState } from 'react';
import Style from "./UseTitle.module.css"


export default function UseTitle(title) {
  useEffect(()=>{
    document.title = `${title}`
  },[]);


  
}
