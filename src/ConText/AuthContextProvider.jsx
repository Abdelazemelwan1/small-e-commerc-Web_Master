import React, { createContext, useState } from 'react'

export let authContext = createContext()

export default function AuthContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [name, setName] = useState(localStorage.getItem("name"))

    
  return (
    <>
        <authContext.Provider  value={{token , setToken , setName ,name}}>
            {children}
        </authContext.Provider>
    </>
  )
}
