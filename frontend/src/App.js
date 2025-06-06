// import logo from './logo.svg';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
//import Home from "./react-pages/Home/Home";
//import About from "./react-pages/About/About";
//import Contact from "./react-pages/Contact/Contact";
import { Provider} from 'react-redux';
import NotFound from "./react-pages/NotFound";
import './index.css';
import { lazy , Suspense} from "react";
import Spinner from "./utils/Spinner";
import Layout from "./components/Layout/Layout";
import { store } from "./store/store";

const HomeComponent = lazy(()=> new Promise((resolve) => setTimeout(()=>resolve(import('./react-pages/Home/Home')), 2000)) );
const AboutComponent = lazy(()=> import('./react-pages/About/About'));
const ContactComponent = lazy(()=> new Promise((resolve) => setTimeout(()=>resolve(import('./react-pages/Contact/Contact')), 200000)) );


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element:<HomeComponent />,
      },
      {
        path: "about",
        element:<AboutComponent />,
      },
      {
        path: "contact",
        element: <Suspense fallback={<Spinner/>}><ContactComponent /></Suspense>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return ( <Provider store={store}><Suspense fallback={<Spinner/>}><RouterProvider router={router} /></Suspense></Provider>);
}

export default App;
