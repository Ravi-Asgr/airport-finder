import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Flights } from "../pages/Flights";

export const PageRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/flights",
            element: <Flights />
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};