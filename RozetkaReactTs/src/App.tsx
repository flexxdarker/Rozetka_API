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
import SubCategoriesPage from "./components/subCategory/subCategoriesPage.tsx";
import EasyLayout from "./components/layout/orderResultLayout/EasyLayout.tsx";
import ProtectedRoute from "./components/guards/ProtectedRoute.tsx";
import ScrollToTop from "./functions/scrollToTop.ts";



const Home = lazy(() => import("./components/Home.tsx"));
const AboutUs = lazy(() => import("./components/layout/footer/AboutUs.tsx"));
const SignIn = lazy(() => import("./components/auth/SignIn.tsx"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage.tsx"));
const SignUp = lazy(() => import("./components/auth/SignUp.tsx"));
const ProductTable = lazy(() => import("./components/product/ProductTable.tsx"));
const ProductForm = lazy(() => import("./components/product/ProductForm.tsx"));
const Contacts = lazy(() => import("./components/layout/footer/Contacts.tsx"));
const DeliveryAndPayment = lazy(() => import("./components/layout/footer/DeliveryAndPayment.tsx"));
const BonusAccount = lazy(() => import("./components/layout/footer/BonusAccount.tsx"));
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
const OrderResultPage = lazy(() => import("./components/order/OrderResultPage.tsx"));
const TermsUseSite = lazy(() => import("./components/layout/footer/TermsUseSite.tsx"));
const Guarantee = lazy(() => import("./components/layout/footer/Guarantee.tsx"));
const Cooperation = lazy(() => import("./components/layout/footer/Cooperation.tsx"));
const ServiceCenters = lazy(() => import("./components/layout/footer/ServiceCenters.tsx"));
const GiftCertificates = lazy(() => import("./components/layout/footer/GiftCertificates.tsx"));
const ProductsReviewed = lazy(() => import("./components/product/productsReviewed.tsx"));

export default function App() {
    return (
        <><ScrollToTop/>
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="" element={<MainLayout/>}>
                    {/*Header*/}
                    <Route index element={<Home/>}/>

                    {/*Footer*/}
                    <Route path="about-us" element={<AboutUs/>}/>
                    <Route path="contacts" element={<Contacts/>}/>
                    <Route path="terms-use-site" element={<TermsUseSite/>}/>

                    <Route path="delivery-and-payment" element={<DeliveryAndPayment/>}/>
                    <Route path="guarantee" element={<Guarantee/>}/>
                    <Route path="return-of-goods" element={<ReturnOfGoods/>}/>

                    <Route path="bonus-account" element={<BonusAccount/>}/>
                    <Route path="gift-certificates" element={<GiftCertificates/>}/>
                    <Route path="cooperation" element={<Cooperation/>}/>
                    <Route path="service-centers" element={<ServiceCenters/>}/>

                    <Route path="order" element={<OrderPage/>}/>
                </Route>

                <Route path="" element={<AdminLayout/>}>
                    <Route element={<ProtectedRoute/>}>
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
                </Route>


                <Route path="subcategories/:id" element={<SubCategoriesPage/>}/>

                <Route path="categories" element={<CategoriesPage/>}/>

                <Route path="product-page/:id" element={<ProductPage/>}/>

                <Route path="product-filter" element={<FilterProductPage/>}/>

                <Route path="comparison-list" element={<ComparisonListPage/>}/>

                <Route path="comparison-products" element={<ComparisonProductsPage/>}/>

                <Route path="wish-list" element={<WishList/>}/>

                <Route path="account" element={<AccountLayout/>}>
                    <Route path="data" element={<AccountData/>}/>
                    <Route path="orders" element={<AccountOrders/>}/>
                    <Route path="wish-list" element={<WishList/>}/>
                    <Route path="comparison-list" element={<ComparisonListPage/>}/>
                    <Route path="comparison-products" element={<ComparisonProductsPage/>}/>
                    <Route path="reviewed-products" element={<ProductsReviewed/>}/>
                </Route>

                <Route path="" element={<CategoryLayout/>}>
                    <Route path="category-1" element={<ProductTable/>}/>
                </Route>

            </Route>

            <Route path="" element={<EasyLayout/>}>
                <Route path="order-result" element={<OrderResultPage/>}/>
                <Route path="signin" element={<Suspense fallback={<MainLoader/>}> <SignIn/> </Suspense>}/>
                <Route path="signup" element={<Suspense fallback={<MainLoader/>}> <SignUp/> </Suspense>}/>
                <Route path="*" element={<Suspense fallback={<MainLoader/>}> <NotFoundPage/> </Suspense>}/>
            </Route>


        </Routes>
        </>
    );
}