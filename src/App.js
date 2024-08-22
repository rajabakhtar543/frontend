
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Homepage from './Components/Pages/Homepage/Homepage';
import Register from './Components/Registration/Register';

import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contact';
import Policy from './Components/Pages/Policy/Policy';
import Pagenotfound from './Components/Pages/Pagenotfound/Pagenotfound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/Pages/User/Dashboard';

import ForgetPassword from './Components/Pages/Forget/ForgetPassword';
import { PrivateRoute } from './Routes/Private';
import { AdminRoute } from './Routes/AdminRoute';
import {AdminDashboard} from './Components/Pages/Admin/Admin';
import {Createcategory} from './Components/Pages/Admin/Createcategory/Createcategory';
import { Createproduct } from './Components/Pages/Admin/Createproduct/CreateProduct';
import AllProducts from './Components/Pages/Admin/Createproduct/AllProducts';
import UpdateProduct from './Components/Pages/Admin/Createproduct/UpdateProduct';

import Products from './Components/Pages/AllProduct/Products';
import Search from './Components/Pages/Search';
import CartPage from './Components/Pages/Cart/CartPage';

import PaymentSuccess from './Components/Pages/Pagenotfound/PaymentSuccess';
import Paymentcancel from './Components/Pages/Pagenotfound/Paymentcancel';
import Orders from './Components/Pages/User/Orders';
import AdminOrders from './Components/Pages/Admin/Createproduct/AdminOrders';
import SingleProduct from './Components/Pages/SingleProduct/SingleProduct';
import Home from './Components/Pages/Admin/Home/Home';



function App() {
  return (
    <>
<Routes>

  <Route path='/' element={<Homepage/>}/>

  <Route path="/Dashboard" element={<PrivateRoute/>}>
  <Route path='user' element={<Dashboard/>}/>
  <Route path='user/profile' element={<Dashboard/>}/>
  <Route path='user/orders' element={<Orders/>}/>
  </Route>
  <Route path="/Dashboard" element={<AdminRoute/>}>
  <Route path='admin' element={<Home/>}/>
  <Route path='admin/create-category' element={<Createcategory/>}/>
  <Route path='admin/create-product' element={<Createproduct/>}/>
  <Route path='admin/products' element={<AllProducts/>}/>
 
  <Route path='admin/products/:slug' element={<UpdateProduct/>}/>
 
  <Route path='admin/orders' element={<AdminOrders/>}/>
  </Route>

  <Route path='/Category' element={<Pagenotfound/>}/>
  <Route path='/pagenotfound' element={<Pagenotfound/>}/>
  <Route path='/AllProducts' element={<Products/>}/>
  <Route path='/product/:slug' element={<SingleProduct/>}/>
  <Route path='/search' element={<Search/>}/>
  <Route path='/cart' element={<CartPage/>}/>
  <Route path='/Register' element={<Register/>}/>
  
  <Route path='/forget' element={<ForgetPassword/>}/>
  <Route path='/About' element={<About/>}/>
  <Route path='/Contact' element={<Contact/>}/>
  <Route path='/Policy' element={<Policy/>}/>
  <Route path='/success' element={<PaymentSuccess/>}/>
  <Route path='/cancel' element={<Paymentcancel/>}/>


</Routes>
      
  </>
  
  );
}

export default App;
