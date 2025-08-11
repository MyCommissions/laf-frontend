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
                <pages.RegisterPage />
            </GuestOnlyRoute>
        )
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <pages.LoginPage />
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
