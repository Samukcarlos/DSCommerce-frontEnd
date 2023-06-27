import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ProductDetails from './routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';
import Cart from './routes/ClientHome/Cart';
import { useState } from 'react';
import { ContexCartCount } from './utils/context-cart';
import Login from './routes/ClientHome/Login';


export default function App() {

  const [contexCartCount, setContexCartCount]= useState<number>(0);

 return (
  <ContexCartCount.Provider value={{contexCartCount, setContexCartCount}}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<ClientHome />}> 
            <Route index element={<Catalog />} /> 
            <Route path= "Catalog" element={<Catalog />} /> 
            <Route path= "product-details/:productId" element={<ProductDetails />} /> 
            <Route path= "cart" element={<Cart />} /> 
            <Route path= "login" element={<Login />} />
          </Route>
      <Route path= "*" element={<Navigate to="/" />} />   
    </Routes>
   </BrowserRouter>
  </ContexCartCount.Provider>
 );
}


