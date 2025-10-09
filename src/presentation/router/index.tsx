import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./middleware.protectedRoute";
import AdminProtectedRoute from "./middleware.adminProtectedRoute";
import GuestOnlyRoute from "./middleware.guestOnlyRoute";
import { pages } from "./route";

const router = createBrowserRouter([
    {
        path: '/signin',
        element: (
            <GuestOnlyRoute>
                <pages.LoginPage />
            </GuestOnlyRoute>
        )
    },
    
    {
        path: '/found',
        element: (
            <ProtectedRoute>
                <pages.FoundPage/>
            </ProtectedRoute>
        )
    },



    {
        path: '/home',
        element: (
            <ProtectedRoute>
                <pages.HomePage/>
            </ProtectedRoute>
        )
    },

    {
        path: '/contact-us',
        element: (
            <ProtectedRoute>
                <pages.ContactPage/>
            </ProtectedRoute>
        )
    },

     {
        path: '/about-us',
        element: (
            <ProtectedRoute>
                <pages.AboutUsPage/>
            </ProtectedRoute>
        )
    },

    {
        path: '/',
        element: (
            <GuestOnlyRoute>
                <pages.LandingPage /> 
            </GuestOnlyRoute>
        ),
    },

        {
        path: '/admin/home',
        element: (
            <ProtectedRoute>
                <pages.AdminHomePage /> 
            </ProtectedRoute>
        ),
    },

    {
        path: '/admin/account',
        element: (
            <ProtectedRoute>
                <pages.AdminAccountPage /> 
            </ProtectedRoute>
        ),
    },

    {
        path: '/*',
        element: <pages.NotFoundPage />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
