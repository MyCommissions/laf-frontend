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
        path: '/contact',
        element: (
            <GuestOnlyRoute>
                <pages.ContactPage/>
            </GuestOnlyRoute>
        )
    },

     {
        path: '/about',
        element: (
            <GuestOnlyRoute>
                <pages.AboutUsPage/>
            </GuestOnlyRoute>
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
            <AdminProtectedRoute>
                <pages.AdminHomePage /> 
            </AdminProtectedRoute>
        ),
    },

    {
        path: '/admin/account',
        element: (
            <AdminProtectedRoute>
                <pages.AdminAccountPage /> 
            </AdminProtectedRoute>
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
