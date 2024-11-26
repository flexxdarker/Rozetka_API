import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Home from "./components/Home.tsx";
import AboutUs from "./components/layout/footer/AboutUs.tsx";
import SignIn from "./components/auth/SignIn.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import ProductTable from "./components/product/ProductTable.tsx";
import ProductForm from "./components/product/ProductForm.tsx";
import Contacts from "./components/layout/footer/Contacts.tsx";
import DeliveryAndPayment from "./components/layout/footer/DeliveryAndPayment.tsx";
import ForCorporateClient from "./components/layout/footer/ForCorporateClient.tsx";
import Franchising from "./components/layout/footer/Franchising.tsx";
import ReturnOfGoods from "./components/layout/footer/ReturnOfGoods.tsx";
import CategoryTable from "./components/category/CategoryTable.tsx";
import CategoryForm from "./components/category/CategoryForm.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*Header*/}
                <Route index element={<Home />} />

                {/*Admin*/}
                <Route path="producttable" element={<ProductTable />} />
                <Route path="productcreate" element={<ProductForm />} />

                <Route path="categorytable" element={<CategoryTable />} />
                <Route path="categorycreate" element={<CategoryForm />} />

                {/*Footer*/}
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="contacts" element={<Contacts />} />

                <Route path="deliveryandpayment" element={<DeliveryAndPayment />} />
                <Route path="returnofgoods" element={<ReturnOfGoods />} />

                <Route path="forcorporateclient" element={<ForCorporateClient />} />

                <Route path="franchising" element={<Franchising />} />

            </Route>
            <Route path="signin" element={<SignIn/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

