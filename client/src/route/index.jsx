import { createBrowserRouter } from "react-router-dom"; 
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMoblie from "../pages/UserMenuMoblie";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import Address from "../pages/Address";
import MyOrder from "../pages/MyOrder";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";


const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path:"",
                element:<Home/>
            },
            {
                path:"search",
                element:<SearchPage/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"verify-otp",
                element:<OtpVerification/>
            },
            {
                path:"reset-password",
                element:<ResetPassword/>
            },
            {
                path:"user",
                element:<UserMenuMoblie/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children: [
                    {
                        path : "profile",
                        element:<Profile/>
                    },
                    {
                        path : "address",
                        element:<Address/>
                    },
                    {
                        path : "myorders",
                        element:<MyOrder/>
                    },
                    {
                        path : "category",
                        element:<AdminPermision><Category/></AdminPermision>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermision><SubCategory/></AdminPermision>
                    },
                    {
                        path: "product",
                        element: <AdminPermision><ProductAdmin/></AdminPermision>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermision><UploadProduct/></AdminPermision>
                    }
                ]
            }
        ]
    }
])

export default router