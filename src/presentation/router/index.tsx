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
        path: '/signup',
        element: (
            <GuestOnlyRoute>
                <></>
            </GuestOnlyRoute>
        )
    },
    {
        path: '/Home',
        element: (
            <GuestOnlyRoute>
                <pages.HomePage/>
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
