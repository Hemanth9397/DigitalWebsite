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
import PortifolioLoader from "./loader/PortifolioLoader";
import Spinner from "./utils/spinner/Spinner";

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
const PortifolioComponent = lazy(() =>
  import("./react-pages/portifolio/Portifolio")
);

const websitesRoutes = [
  {
    path: "blogger",
    element: <BloggerComponent />,
  },
  {
    path: "shopping",
    element: <ShoppingComponent />,
  },
  {
    path: "portfolio",
    loader: PortifolioLoader,
    element: <PortifolioComponent />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    loader: ({ request }) => {
      const url = new URL(request.url);
      const currentPath = url.pathname;
      if (currentPath !== "/home") {
        return redirect("/home");
      }
      return null;
    },
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <HomeComponent />,
      },
      {
        path: "about",
        element: <AboutComponent />,
      },
      {
        path: "contact",
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
