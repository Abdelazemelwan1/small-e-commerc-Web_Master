// import { Children } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import NavBar from './components/NavBar/NavBar'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import AuthContextProvider from './ConText/AuthContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Carts from './components/Carts/Carts';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './ConText/CartContextProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// QueryClientProvider

let client = new QueryClient()

function App() {

let router = createBrowserRouter([
    {path:"" , element:<Layout /> , children: [
      {path: "" , element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path: "carts" , element:<ProtectedRoute><Carts /></ProtectedRoute>},
      {path: "productDetails/:id/:category" , element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
      {path: "login" , element:<Login />},
      {path: "register" , element:<Register />},
      {path: "*" , element:<NotFoundPage />}
     
    ]}
  ])
  return (
    <>
    <QueryClientProvider client={client}>

      <AuthContextProvider >
        <CartContextProvider>
          <RouterProvider router={router}/>
          <Toaster />  
        </CartContextProvider>
      </AuthContextProvider>

    </QueryClientProvider>
    
    
    </>
  )
}

export default App
