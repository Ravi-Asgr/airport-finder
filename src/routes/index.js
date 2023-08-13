import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { About } from "../pages/About";

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
    );
};