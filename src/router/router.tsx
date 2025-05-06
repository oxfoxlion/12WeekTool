import { createBrowserRouter } from "react-router-dom";

//未登入
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Layout from "../Layout/Layout";
import NotFound from "../Pages/NotFound";

//已登入
import UserLayout from "../Layout/UserLayout";
import Dashboard from "../Pages/Dashboard";

export const route = createBrowserRouter([
    {
        path:"/",
        element:<Layout></Layout>,
        children:[
            {
                index:true,
                element:<Home></Home>,
            },{
                path:"signUp",
                element:<SignUp></SignUp>
            },{
                path:"signIn",
                element:<SignIn></SignIn>
            }
        ]
    },{
        path:"/user",
        element:<UserLayout></UserLayout>,
        children:[
            {
                index:true,
                element:<Dashboard></Dashboard>
            }
        ]
    },{
        path:"*",
        element:<NotFound></NotFound>
    }
])