import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Content } from "../Content";
import { Container } from "../components/container/Container";

export const PageRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/about",
            element: <About />
        }
    ]);

    return (
        <RouterProvider router={router} />
        // <BrowserRouter>
        //     <Routes>
        //         <Route path="/" element={<Content />}>
        //             <Route path="/about" element={<About />} />
        //         </Route>
        //     </Routes>
        // </BrowserRouter>
    );
};