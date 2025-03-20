import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from 'react';
import AppLayout from "./components/layout/appLayout/AppLayout.tsx";
import MainLoader from "./components/loaders/MainLoader.tsx";
import MainLayout from "./components/layout/mainLayout/MainLayout.tsx";
import CategoryLayout from "./components/layout/categoryLayout/CategoryLayout.tsx";
import ProductPage from "./components/product/ProductPage.tsx";
import React from "react";
import AccountLayout from "./components/layout/accountLayout/AccountLayout.tsx";
import AdminLayout from "./components/layout/adminLayout/AdminLayout.tsx";
// import FilterTable from "./components/filter/filterTable.tsx";
// import UsersTable from "./components/users/UsersTable.tsx";
// import OrdersTable from "./components/orders/OrdersTable.tsx";
//import CategoriesPage from "./components/category/CategoriesPage.tsx";
// import ComparisonListPage from "./components/comparison/ComparisonListPage.tsx";
// import ComparisonProductsPage from "./components/comparison/ComparisonProductsPage.tsx";
// import FilterProductPage from "./components/filter/filterProductPage.tsx";
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
const OrderPage = lazy(() => import("./components/order/OrderPage.tsx"));
const AccountData = lazy(() => import("./components/account/AccountData.tsx"));
const AccountOrders = lazy(() => import("./components/account/AccountOrders.tsx"));
const WishList = lazy(() => import("./components/account/WishList.tsx"));
const FilterProductPage = lazy(() => import("./components/filter/filterProductPage.tsx"));
const ComparisonListPage = lazy(() => import("./components/comparison/ComparisonListPage.tsx"));
const ComparisonProductsPage = lazy(() => import("./components/comparison/ComparisonProductsPage.tsx"));
const CategoriesPage = lazy(() => import("./components/category/CategoriesPage.tsx"));
const OrdersTable = lazy(() => import("./components/orders/OrdersTable.tsx"));
const UsersTable = lazy(() => import("./components/users/UsersTable.tsx"));
const FilterTable = lazy(() => import("./components/filter/filterTable.tsx"));


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="" element={<MainLayout/>}>
                    {/*Header*/}
                    <Route index element={<Home/>}/>

                    {/*Footer*/}
                    <Route path="about-us" element={<AboutUs/>}/>
                    <Route path="contacts" element={<Contacts/>}/>

                    <Route path="delivery-and-payment" element={<DeliveryAndPayment/>}/>
                    <Route path="return-of-goods" element={<ReturnOfGoods/>}/>

                    <Route path="for-corporate-client" element={<ForCorporateClient/>}/>

                    <Route path="franchising" element={<Franchising/>}/>

                    <Route path="order" element={<OrderPage/>}/>
                </Route>

                <Route path="" element={<AdminLayout/>}>
                    <Route path="products-crud" element={<ProductTable/>}/>
                    <Route path="products-crud/create" element={<ProductForm/>}/>
                    <Route path="products-crud/edit/:id" element={<ProductForm/>}/>
                    {/*<Route path="product-page/:id" element={<ProductPage/>}/>*/}

                    <Route path="categories-crud" element={<CategoryTable/>}/>
                    <Route path="categories-crud/create" element={<CategoryForm/>}/>
                    <Route path="categories-crud/edit/:id" element={<CategoryForm/>}/>

                    <Route path="orders-crud" element={<OrdersTable/>}/>

                    <Route path="users-crud" element={<UsersTable/>}/>

                    <Route path="filter-crud" element={<FilterTable/>}/>
                </Route>

                <Route path="categories" element={<CategoriesPage/>}/>

                <Route path="product-page/:id" element={<ProductPage/>}/>
                <Route path="product-filter" element={<FilterProductPage/>}/>

                <Route path="comparison-list" element={<ComparisonListPage/>}/>
                <Route path="comparison-products" element={<ComparisonProductsPage/>}/>

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

