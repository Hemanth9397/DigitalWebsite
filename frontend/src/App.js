// import logo from './logo.svg';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ErrorPage from "./components/ErrorPage/ErrorPage";
//import Home from "./react-pages/Home/Home";
//import About from "./react-pages/About/About";
//import Contact from "./react-pages/Contact/Contact";
import NotFound from "./react-pages/NotFound";
import './index.css';
import { lazy , Suspense} from "react";

const HomeComponent = lazy(()=> import('./react-pages/Home/Home'))
const AboutComponent = lazy(()=> import('./react-pages/About/About'))
const ContactComponent = lazy(()=> import('./react-pages/Contact/Contact'))


const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>loading...</div>}><HomeComponent /></Suspense>,
      },
      {
        path: "about",
        element: <Suspense fallback={<div>loading...</div>}><AboutComponent /></Suspense>,
      },
      {
        path: "contact",
        element: <Suspense fallback={<div>loading...</div>}><ContactComponent /></Suspense>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
