import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./middleware.protectedRoute";
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
        path: '/admin-home',
        element: (
            <GuestOnlyRoute>
                <pages.AdminHomePage /> 
            </GuestOnlyRoute>
        ),
    },

    {
        path: '/account',
        element: (
            <GuestOnlyRoute>
                <pages.AdminAccountPage /> 
            </GuestOnlyRoute>
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
