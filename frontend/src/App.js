// import logo from './logo.svg';
import "./App.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { Provider } from "react-redux";
import NotFound from "./react-pages/NotFound";
import "./index.css";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import { store } from "./store/store";
import PortfolioLoader from "./loaders/PortfolioLoader";
import Spinner from "./components/spinner/Spinner";

const HomeComponent = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./react-pages/home/Home")), 2000)
    )
);
const ContactComponent = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./react-pages/contact/Contact")), 5000)
    )
);
const AboutComponent = lazy(() => import("./react-pages/about/About"));
const BloggerComponent = lazy(() => import("./react-pages/blogger/Blogger"));
const ShoppingComponent = lazy(() => import("./react-pages/shopping/Shopping"));
const PortfolioComponent = lazy(() =>
  import("./react-pages/portfolio/Portfolio")
);

const websitesRoutes = [
  {
    path: "api/v1/blogger",
    element: <BloggerComponent />,
  },
  {
    path: "api/v1/shopping",
    element: <ShoppingComponent />,
  },
  { 
    path: "api/v1/portfolio",
    loader: PortfolioLoader,
    element: <PortfolioComponent />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    loader: ({ request }) => {
      const url = new URL(request.url);
      const currentPath = url.pathname;
      if (currentPath !== "/api/v1/portfolio") {
        return redirect("/api/v1/portfolio");
      }
      return null;
    },
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "api/v1/home",
        element: <HomeComponent />,
      },
      {
        path: "api/v1/about",
        element: <AboutComponent />,
      },
      {
        path: "api/v1/contact",
        element: <ContactComponent />,
      },
      ...websitesRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (

    <Provider store={store}>
      <Suspense fallback={<Spinner/>}>
      <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
