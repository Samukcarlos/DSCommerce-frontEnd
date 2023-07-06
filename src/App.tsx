import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ProductDetails from './routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';
import Cart from './routes/ClientHome/Cart';
import { useEffect, useState } from 'react';
import { ContexCartCount } from './utils/context-cart';
import Login from './routes/ClientHome/Login';
import Admin from './routes/Admin';
import AdminHome from './routes/Admin/AdminHome';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {history} from './utils/history';
import { PrivateRoute } from './components/PrivatRoute';
import { accessTokenPayloadDTO } from './models/auth';
import { ContextToken } from './utils/context-token';
import * as authService from './services/auth-service';
import * as cartService from './services/cart-service';
import Confirmation from './routes/ClientHome/Confirmation';
import ProductListing from './routes/Admin/ProductListing';
import ProductForm from './routes/Admin/ProductForm';
import './index.css'

export default function App() {

  const [contexCartCount, setContexCartCount]= useState<number>(0);

  const [contextTokenPayload, setContextTokenPayload] = useState<accessTokenPayloadDTO>();

  useEffect(() => {
    setContexCartCount(cartService.getCart().items.length);
    if (authService.isAuthenticated()) {
    const payload = authService.getAccessTokenPayload();
    setContextTokenPayload(payload);
    }
    }, []);

 return (
  <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
  <ContexCartCount.Provider value={{contexCartCount, setContexCartCount}}>
    <HistoryRouter history={history}>
      <Routes>
          <Route path="/" element={<ClientHome />}> 
            <Route index element={<Catalog />} /> 
            <Route path= "Catalog" element={<Catalog />} /> 
            <Route path= "product-details/:productId" element={<ProductDetails />} /> 
            <Route path= "cart" element={<Cart />} /> 
            <Route path= "login" element={<Login />} />
            <Route path= "confirmation/:orderId" element={<PrivateRoute><Confirmation /></PrivateRoute> } />
          </Route>
          <Route path="/admin/" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Admin/>
            </PrivateRoute>  
          }>
            <Route index element={<Navigate to={"/admin/home"} />}/>
            <Route path='home' element={<AdminHome/>}/>
            <Route path= "products" element={<ProductListing/>} />
            <Route path= "products/:productId" element={<ProductForm/>} />
          </Route>
      <Route path= "*" element={<Navigate to="/" />} />   
    </Routes>
   </HistoryRouter>
  </ContexCartCount.Provider>
  </ContextToken.Provider>
 );
}


