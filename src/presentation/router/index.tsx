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
            <ProtectedRoute>
                <pages.ContactPage/>
            </ProtectedRoute>
        )
    },

     {
        path: '/about',
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
        path: '/admin-home',
        element: (
            <GuestOnlyRoute>
                <pages.AdminHomePage /> 
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
