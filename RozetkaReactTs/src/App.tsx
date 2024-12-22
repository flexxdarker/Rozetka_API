import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from 'react';
import Layout from "./components/layout/Layout.tsx";
import MainLoader from "./components/loaders/MainLoader.tsx";
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

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*Header*/}
                <Route index element={<Home />} />

                {/*Admin*/}
                <Route path="product-table" element={<ProductTable />} />
                <Route path="product-create" element={<ProductForm />} />

                <Route path="category-table" element={<CategoryTable />} />
                <Route path="category-create" element={<CategoryForm />} />

                {/*Footer*/}
                <Route path="about-us" element={<AboutUs />} />
                <Route path="contacts" element={<Contacts />} />

                <Route path="delivery-and-payment" element={<DeliveryAndPayment />} />
                <Route path="return-of-goods" element={<ReturnOfGoods />} />

                <Route path="for-corporate-client" element={<ForCorporateClient />} />

                <Route path="franchising" element={<Franchising />} />

            </Route>
            <Route path="signin" element={<Suspense fallback={<MainLoader/>}> <SignIn/> </Suspense>}/>
            <Route path="signup" element={<Suspense fallback={<MainLoader/>}> <SignUp/> </Suspense>}/>
            <Route path="*" element={<Suspense fallback={<MainLoader/>}> <NotFoundPage/> </Suspense>}/>
        </Routes>
    );
}

