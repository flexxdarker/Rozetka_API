import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from 'react';
import AppLayout from "./components/layout/appLayout/AppLayout.tsx";
import MainLoader from "./components/loaders/MainLoader.tsx";
import MainLayout from "./components/layout/mainLayout/MainLayout.tsx";
import CategoryLayout from "./components/layout/categoryLayout/CategoryLayout.tsx";
import ProductPage from "./components/product/ProductPage.tsx";
import React from "react";
import AccountLayout from "./components/layout/accountLayout/AccountLayout.tsx";
//import WishList from "./components/account/WishList.tsx";
// import AccountOrders from "./components/account/AccountOrders.tsx";
// import AccountData from "./components/account/AccountData.tsx";
// import OrderPage from "./components/order/OrderPage.tsx";
// import SubCategoryTable from "./components/subCategory/SubCategoryTable.tsx";
// import SubCategoryForm from "./components/subCategory/SubCategoryForm.tsx";
// import Home from "./components/Home.tsx";
// import AboutUs from "./components/layout/footer/AboutUs.tsx";
// import SignIn from "./components/auth/SignIn.tsx";
// import NotFoundPage from "./components/NotFoundPage.tsx";
// import SignUp from "./components/auth/SignUp.tsx";
// import ProductTable from "./components/product/ProductTable.tsx";
// import ProductForm from "./components/product/ProductForm.tsx";
// import Contacts from "./components/layout/footer/Contacts.tsx";
// import DeliveryAndPayment from "./components/layout/footer/DeliveryAndPayment.tsx";
// import ForCorporateClient from "./components/layout/footer/ForCorporateClient.tsx";
// import Franchising from "./components/layout/footer/Franchising.tsx";
// import ReturnOfGoods from "./components/layout/footer/ReturnOfGoods.tsx";
// import CategoryTable from "./components/category/CategoryTable.tsx";
// import CategoryForm from "./components/category/CategoryForm.tsx";
// import Basket from "./components/basket/Basket.tsx";

const Home = lazy(() => import("./components/Home.tsx"));
const AboutUs = lazy(() => import("./components/layout/footer/AboutUs.tsx"));
const SignIn = lazy(() => import("./components/auth/SignIn.tsx"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage.tsx"));
const SignUp = lazy(() => import("./components/auth/SignUp.tsx"));
const ProductTable = lazy(() => import("./components/product/ProductTable.tsx"));
const ProductForm = lazy(() => import("./components/product/ProductForm.tsx"));
const Contacts = lazy(() => import("./components/layout/footer/Contacts.tsx"));
const DeliveryAndPayment = lazy(() => import("./components/layout/footer/DeliveryAndPayment.tsx"));
const ForCorporateClient = lazy(() => import("./components/layout/footer/ForCorporateClient.tsx"));
const Franchising = lazy(() => import("./components/layout/footer/Franchising.tsx"));
const ReturnOfGoods = lazy(() => import("./components/layout/footer/ReturnOfGoods.tsx"));
const CategoryTable = lazy(() => import("./components/category/CategoryTable"));
const CategoryForm = lazy(() => import("./components/category/CategoryForm.tsx"));
const SubCategoryTable = lazy(() => import("./components/subCategory/SubCategoryTable.tsx"));
const SubCategoryForm = lazy(() => import("./components/subCategory/SubCategoryForm.tsx"));
const OrderPage = lazy(() => import("./components/order/OrderPage.tsx"));
const AccountData = lazy(() => import("./components/account/AccountData.tsx"));
const AccountOrders = lazy(() => import("./components/account/AccountOrders.tsx"));
const WishList = lazy(() => import("./components/account/WishList.tsx"));

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="" element={<MainLayout/>}>
                    {/*Header*/}
                    <Route index element={<Home/>}/>

                    {/*Admin*/}
                    <Route path="products" element={<ProductTable/>}/>
                    <Route path="products/create" element={<ProductForm/>}/>
                    <Route path="products/edit/:id" element={<ProductForm/>}/>
                    {/*<Route path="product-page/:id" element={<ProductPage/>}/>*/}

                    <Route path="categories" element={<CategoryTable/>}/>
                    <Route path="categories/create" element={<CategoryForm/>}/>
                    <Route path="categories/edit/:id" element={<CategoryForm/>}/>

                    <Route path="subcategories" element={<SubCategoryTable/>}/>
                    <Route path="subcategories/create" element={<SubCategoryForm/>}/>
                    <Route path="subcategories/edit/:id" element={<SubCategoryForm/>}/>

                    {/*Footer*/}
                    <Route path="about-us" element={<AboutUs/>}/>
                    <Route path="contacts" element={<Contacts/>}/>

                    <Route path="delivery-and-payment" element={<DeliveryAndPayment/>}/>
                    <Route path="return-of-goods" element={<ReturnOfGoods/>}/>

                    <Route path="for-corporate-client" element={<ForCorporateClient/>}/>

                    <Route path="franchising" element={<Franchising/>}/>

                    <Route path="order" element={<OrderPage/>}/>
                </Route>

                <Route path="product-page/:id" element={<ProductPage/>}/>

                <Route path="account" element={<AccountLayout/>}>
                    <Route path="data" element={<AccountData/>}/>
                    <Route path="orders" element={<AccountOrders/>}/>
                    <Route path="wish-list" element={<WishList/>}/>
                </Route>

                <Route path="" element={<CategoryLayout/>}>
                    <Route path="category-1" element={<ProductTable/>}/>
                </Route>

            </Route>
            <Route path="signin" element={<Suspense fallback={<MainLoader/>}> <SignIn/> </Suspense>}/>
            <Route path="signup" element={<Suspense fallback={<MainLoader/>}> <SignUp/> </Suspense>}/>
            <Route path="*" element={<Suspense fallback={<MainLoader/>}> <NotFoundPage/> </Suspense>}/>
        </Routes>
    );
}

