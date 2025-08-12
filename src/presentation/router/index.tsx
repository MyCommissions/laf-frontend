import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./middleware.protectedRoute";
import GuestOnlyRoute from "./middleware.guestOnlyRoute";
import { pages } from "./route";

const router = createBrowserRouter([
    {
        path: '/signin',
        element: (
            <GuestOnlyRoute>
                <></>
            </GuestOnlyRoute>
        )
    },
    
    {
        path: '/signup',
        element: (
            <GuestOnlyRoute>
                <></>
            </GuestOnlyRoute>
        )
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <></>
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
        path: '/*',
        element: <pages.NotFoundPage />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
