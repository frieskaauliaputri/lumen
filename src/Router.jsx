import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound";
import InboundStore from "./pages/InboundStore";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/stuff/data', element: <Stuff/> },
    { path: '/stuff/trash', element: <TrashStuff/> },
    { path: '/inbound-stuff', element: <Inbound/> },
    { path: '/inbound-stuff/data', element: <InboundStore/> },
    
    

])