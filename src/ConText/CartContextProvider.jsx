import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider({children}) {

    // const [cart, setCart] = useState([]);
     // 👇 ناخد القيم من localStorage أول ما يفتح
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 📝 كل ما cart يتغير نخزنه في localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // دالة الإضافة مع زيادة الكمية لو المنتج موجود
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        //  toast.success("تم زيادة الكمية ✅");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // toast.success("تمت إضافة المنتج للسلة 🛒");
        return [...prev, { ...product, quantity: 1 }];
      }
    });
      toast.success("تمت إضافة المنتج للسلة 🛒"); // 👈 التوست هنا فقط

  };
 

  
  // إنقاص الكمية
  const decreaseQty = (id) => {
    setCart((prev) =>{
      const updated = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
        return updated;
        
        
    });
    toast("تم تقليل الكمية ➖");
  };

    // إزالة منتج
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
        toast.error("تم حذف المنتج 🗑️");
};

    // 🆕 مسح كل الكارت
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.error("تم تفريغ السلة 🧹");
  };
  
  // إجمالي عدد المنتجات
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // إجمالي السعر الكلي
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
        <CartContext.Provider value={{cart, addToCart, decreaseQty, removeFromCart,clearCart , totalItems , totalPrice}}>
            {children}
        </CartContext.Provider>
    </>
  )
}
