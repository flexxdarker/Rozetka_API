// import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store/index.ts";
import React from 'react';
import {ToastContainer} from "react-toastify";


createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)