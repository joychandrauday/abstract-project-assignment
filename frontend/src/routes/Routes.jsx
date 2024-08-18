import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CloseRoute from "../pages/ClosedRoute/CloseRoute";
import PrivateRoute from "./PrivateRoute";
import CardDetails from "../pages/CardDetails/CardDetails";
import MyRequests from "../pages/MyRequests/MyRequests";
import AddCard from "../pages/AddCard/AddCard";
import Allrequest from "../pages/AllRequests/Allrequest";
import AllCards from "../pages/AllCards/AllCards";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/private",
        element: (
          <PrivateRoute>
            <CloseRoute />
          </PrivateRoute>
        ),
      },
      {
        path: "/requests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/addcard",
        element: (
          <PrivateRoute>
            <AddCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-requests",
        element: (
          <PrivateRoute>
            <Allrequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-cards",
        element: (
          <PrivateRoute>
            <AllCards />
          </PrivateRoute>
        ),
      },
      {
        path: "/cards/:title",
        element: <CardDetails />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
