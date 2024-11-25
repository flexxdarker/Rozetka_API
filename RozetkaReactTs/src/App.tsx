// import './App.css'
//
// function App() {
//
//   return (
//     <>
//         <h1>Header</h1>
//     </>
//   )
// }
//
// export default App


import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./components/Home.tsx";
import AboutUs from "./components/AboutUs.tsx";



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home />} />
                <Route path="test" element={<Home />} />
                <Route path="aboutus" element={<AboutUs />} />
            </Route>
        </Routes>
    );
}

