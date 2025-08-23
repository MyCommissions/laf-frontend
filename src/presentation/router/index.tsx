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
            <GuestOnlyRoute>
                <pages.FoundPage/>
            </GuestOnlyRoute>
        )
    },

    {
        path: '/lost',
        element: (
            <GuestOnlyRoute>
                <pages.LostPage/>
            </GuestOnlyRoute>
        )
    },

    {
        path: '/home',
        element: (
            <GuestOnlyRoute>
                <pages.HomePage/>
            </GuestOnlyRoute>
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
        path: '/*',
        element: <pages.NotFoundPage />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
