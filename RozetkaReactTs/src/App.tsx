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



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
            </Route>
        </Routes>
    );
}

