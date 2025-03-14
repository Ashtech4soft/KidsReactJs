import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/user/Home';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Header from './components/user/Header';
import Footer from './components/user/Footer';
import AdminHome from './pages/admin/AdminHome';
import AdminHeader from './components/admin/AdminHeader';
import AdminFooter from './components/admin/AdminFooter';
import Logout from './components/Logout';
import ViewCustomers from './pages/admin/ViewCustomers';
import AddCustomer from './pages/admin/AddCustomer';
import AddProduct from './pages/admin/AddProduct';
import ViewProduct from './pages/admin/ViewProduct';
import ViewSupplier from './pages/admin/ViewSupplier';
import ViewCharitys from './pages/admin/ViewCharity';
import CategoryManage from './pages/admin/CategoryManage';
import ProductDetails from './pages/user/ProductDetails';
import SupplierHome from './pages/suppliers/SupplierHome';
import SupplierProfile from './components/supplier/SupplierProfile';
import SupplierProduct from './pages/suppliers/ViewSupplierProduct';
import Profile from './pages/user/Profile';
import Cart from './pages/user/Cart';
import PaymentSuccess from './components/user/PaymentSuccess';
import PaymentFailed from './components/user/PaymentFaild';
import Orders from './pages/user/Orders';
import ReviewManagment from './pages/admin/ReviewManagment';
import OrderManagment from './pages/admin/OrderManagment';
import Payment from './pages/admin/Payment';
import AddSupplier from './pages/admin/AddSuplpier';
import AddCharity from './pages/admin/AddCharity';
import CharityHome from './pages/charity/CharityHome';
import Shop from './pages/user/Shop';
import ShopByCategory from './pages/user/ShopByCategory';
import Community from './pages/user/Community';
import CommunityActivites from './pages/user/CommunityActivites';
import ViewCommuProduct from './pages/user/ViewCommuProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import Charity from './pages/user/Charity';
import ViewCharitProduct from './pages/charity/ViewCharitProduct';
import UserPayment from './pages/user/Payments';
import AddMaternityProduct from './pages/admin/MaternityProduct';
import MatternityManegment from './pages/admin/MatternityManegment';
import ViewMaternityProducts from './pages/admin/ViewMaternityProducts';
import MaternityPage from './pages/user/MaternityPage';
import ProductByMaternityCategory from './pages/user/ProductByMaternityCategory';
import CharityProfile from './components/charity/CharityProfile';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    // Listen for role changes
    const storedRole = localStorage.getItem('role');
    if (storedRole !== role) {
      setRole(storedRole);
    }
  }, [role]);

  return (
    <BrowserRouter>
      {role === 'admin' && <AdminHeader />}
      {role === 'supplier' && <AdminHeader />}
      {role === 'charity' && <AdminHeader />}
      {role === 'user' && <Header />}
      {!role && <Header />}

      <Routes>
        {/* Public Routes (For Not Logged In Users) */}
        {!role && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}

        {/* User Routes */}
        {role === 'user' && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/productDetails" element={<ProductDetails />} />
            <Route path="/Uprofile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/fails" element={<PaymentFailed />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shopByCategory" element={<ShopByCategory />} />
            <Route path="/community" element={<Community />} />
            <Route path="/communityActivity/:id" element={<CommunityActivites />} />
            <Route path='/add-product/:id' element={<AddProduct />} />
            <Route path='/view-commuproduct' element={<ViewCommuProduct />} />
            <Route path='/updateProduct/:id' element={<UpdateProduct />} />
            <Route path='/charity' element={<Charity />} />
            <Route path='/orderManagment' element={<OrderManagment />} />
            <Route path='/Payments' element={<UserPayment />} />
            <Route path='/maternity' element={<MaternityPage />} />
            <Route path='/maternityproducts/:cate' element={<ProductByMaternityCategory />} />




          </>
        )}

        {/* Admin Routes */}
        {role === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminHome />} />
            <Route path='/view-customer' element={<ViewCustomers />} />
            <Route path='/add-customer' element={<AddCustomer />} />
            <Route path='/view-product' element={<ViewProduct />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/view-suppliers' element={<ViewSupplier />} />
            <Route path='/add-supplier' element={<AddSupplier />} />
            <Route path='/view-charitys' element={<ViewCharitys />} />
            <Route path='/add-charity' element={<AddCharity />} />
            <Route path='/categoryManagment' element={<CategoryManage />} />
            <Route path='/reviewManagment' element={<ReviewManagment />} />
            <Route path='/orderManagment' element={<OrderManagment />} />
            <Route path='/Payments' element={<Payment />} />
            <Route path='/updateProduct/:id' element={<UpdateProduct />} />
            {/* <Route path='/AddMaternityProduct' element={<AddMaternityProduct />} /> */}
            <Route path='/AddMaternityProduct' element={<MatternityManegment />} />
            <Route path='/viewMaternityproduct' element={<ViewMaternityProducts />} />


          </>
        )}
        {role === 'supplier' && (
          <>
            <Route path='/supplier' element={<SupplierHome />} />
            <Route path='/add-customer' element={<AddCustomer />} />
            <Route path='/view-supproduct' element={<SupplierProduct />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/supplierProfile' element={<SupplierProfile />} />
            <Route path='/categoryManagment' element={<CategoryManage />} />
            <Route path='/orderManagment' element={<OrderManagment />} />
            <Route path='/updateProduct/:id' element={<UpdateProduct />} />


          </>
        )}

        {role === 'charity' && (
          <>
            <Route path='/charity' element={<CharityHome />} />
            <Route path='/viewCharityProducts' element={<ViewCharitProduct />} />
            <Route path='/charityProfile' element={<CharityProfile />} />
          </>
        )}
        {/* Logout Route */}
        <Route path="/logout" element={<Logout />} />
        {/* Redirect to Home if no matching route */}
        <Route path="*" element={<Home />} />
      </Routes>
      {role === 'admin' || role === 'supplier' || role === 'charity' ? null : <Footer />}
    </BrowserRouter>
  );
};

export default App;