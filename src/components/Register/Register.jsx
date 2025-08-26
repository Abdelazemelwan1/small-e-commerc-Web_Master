import React, { useContext, useEffect, useState } from 'react'
import Style from './Register.module.css'
import { FaRegIdBadge } from 'react-icons/fa'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from "yup"
import { BarLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { authContext } from '../../ConText/AuthContextProvider';


export default function Register() {
        // let {setToken ,setName } = useContext(authContext)
    
    // const [massageError, setMassageError] = useState(null)
    const [islooding, setIslooding] = useState(false)
    let navigate =useNavigate()

     function handleRegister(values) {
        console.log(values);
        setIslooding(true)
        let lodingToast = toast.loading("loading....")
         axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
        .then((res)=>{
            console.log(res);
            toast.success(res.data.message)
            // setToken(res.data.token)
            // localStorage.setItem("token" ,res.data.token )
            // setName(res.data.user.name)
            // localStorage.setItem("name" ,res.data.user.name)
            setTimeout(() => {
                navigate("/Login")
            }, 1500);
            
        }).catch((erroe)=>{
            console.log(erroe);
            toast.error(erroe.response.data.message)
            
        }).finally(()=>{
            setIslooding(false)
            toast.dismiss(lodingToast)
        })
        
    }




    let validationSchema = YUP.object().shape({
           name: YUP.string().min(3, "name min 3 char").max(10, "name max 10 char").required("name is required"),
            email:YUP.string().email("email is in-valid").required("email is required"),
            password:YUP.string().matches(/^\w{8,15}$/ , "password min 8 to 15 letters").required("password is required"),
            rePassword:YUP.string().oneOf([YUP.ref("password")] , "password and repassword dont match").required("rePassword is required"),
            phone:YUP.string().matches(/^01[0125][0-9]{8}$/ , "phone must be egyption number").required("phone is required")
    })

    let registerFormik = useFormik({
        initialValues : {
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        onSubmit:handleRegister,
        validationSchema 

    })


     useEffect(() => {
   AOS.init({duration: 2000})
  }, [])

    return (
        <>
        {/* {massageError ? <h2 className='text-center p-2 bg-amber-300 w-fit rounded-2xl px-4 m-auto'>{massageError}</h2> : null } */}
           <div className="bg-white relative ">
  <div className="flex flex-col items-center justify-between pt-0 md:pr-10 pb-0 md:pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
    <div className="flex flex-col items-center   pt-5 md:pr-10 pb-15 md:pl-10 lg:pt-15 lg:flex-row">
      <div data-aos="fade-right" className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-6/12">
        <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
          <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" className="btn-" />
        </div>
      </div>



            <form data-aos="fade-left" onSubmit={registerFormik.handleSubmit}  className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-6/12">
                <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                    <p className="w-full text-2xl md:text-3xl  md:font-medium text-center leading-snug font-serif text-[#6366F1] flex items-center gap-2"> <FaRegIdBadge />Create Account Now :</p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-6">

                        <div className="relative">
                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Username</p>
                        <input
                            name='name'
                            value={registerFormik.values.name}
                            onChange={registerFormik.handleChange}
                            // onChange={(e)=>{
                            //     registerFormik.handleChange(e)
                            //     setName(e.target.value)
                            //     // localStorage.setItem("name" , e.target.value)
                            // }}
                            onBlur={registerFormik.handleBlur}
                            placeholder="Enter Username" type="text" className="border placeholder-gray-400 focus:outline-none focus:border-[#6366F1] w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                        {registerFormik.errors.name && registerFormik.touched.name ? <h2 className='text-red-700 px-2 flex items-center gap-1'><span>*</span> {registerFormik.errors.name}</h2> : null }
                        </div>
                        <div className="relative">
                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                        <input 
                            name='email'
                            value={registerFormik.values.email}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            placeholder="Enter Email" type="email" className="border placeholder-gray-400 focus:outline-none focus:border-[#6366F1] w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                        {registerFormik.errors.email && registerFormik.touched.email ? <h2 className='text-red-700 px-2 flex items-center gap-1'><span>*</span>{registerFormik.errors.email}</h2> : null }
                        </div>
                        <div className="relative">
                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p>
                        <input 
                            name='password'
                            value={registerFormik.values.password}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            placeholder="Enter Password" type="password" className="border placeholder-gray-400 focus:outline-none focus:border-[#6366F1] w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                        {registerFormik.errors.password && registerFormik.touched.password ? <h2 className='text-red-700 px-2 flex items-center gap-1 '><span>*</span>{registerFormik.errors.password}</h2> : null }
                        </div>

                        <div className="relative">
                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">rePassword</p>
                        <input 
                            name='rePassword'
                            value={registerFormik.values.rePassword}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            placeholder="Enter rePassword" type="password" className="border placeholder-gray-400 focus:outline-none focus:border-[#6366F1] w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                        {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <h2 className='text-red-700 px-2 flex items-center gap-1'><span>*</span>{registerFormik.errors.rePassword}</h2> : null }
                        </div>
                        <div className="relative">
                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Phone</p>
                        <input 
                            name='phone'
                            value={registerFormik.values.phone}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            placeholder="Enter phone" type="tel" className="border placeholder-gray-400 focus:outline-none focus:border-[#6366F1] w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                        {registerFormik.errors.phone && registerFormik.touched.phone ? <h2 className='text-red-700 px-2 flex items-center gap-1'><span>*</span>{registerFormik.errors.phone}</h2> : null }
                        </div>
                        <div className="relative">
                            <button disabled={islooding ? true : false}  type='submit' className="cursor-pointer w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease">
                                {islooding ? <BarLoader />:"Register"}
                            </button>
                            <p className='text-center text-sm md:text-[16px] capitalize mt-3'>Login to your existing account :<Link className="text-[#6366F1] hover:text-[#0d10c5] capitalize" to="/Login"> sing in</Link></p>
                        </div>

                    </div>
                </div>
                <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
            fill-current"><g stroke="none" strokeWidth={1} fillRule="evenodd"><g fillRule="nonzero"><g><g><circle cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445" r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441" cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525" r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525" r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261" cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605" r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686" r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686" r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261" cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767" r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846" r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846" r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261" cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926" r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006" r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006" r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
                <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
            fill-current"><g stroke="none" strokeWidth={1} fillRule="evenodd"><g fillRule="nonzero"><g><g><circle cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445" r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441" cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525" r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525" r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261" cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605" r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686" r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686" r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261" cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767" r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846" r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846" r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261" cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926" r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006" r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006" r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
            </form>
        
    </div>
  </div>
</div>
        </>
    )
}
