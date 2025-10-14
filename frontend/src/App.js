import { App as AntdApp, ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import Layout from "./components/Layout/Layout";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import NotFound from "./react-pages/NotFound";
import Spinner from "./components/spinner/Spinner";

import { lazy, Suspense, useEffect } from "react";
import "./index.css";
import "./App.css";
import RequireAdmin from "./react-pages/Admin/RequireAdmin.jsx";

// Lazy imports...
const HomeComponent = lazy(() => import("./react-pages/Home"));
const ContactComponent = lazy(() => import("./react-pages/Contact"));
const AboutComponent = lazy(() => import("./react-pages/About"));
const SettingsComponent = lazy(() => import("./react-pages/settings/Settings"));
const BloggerComponent = lazy(() => import("./react-pages/Blogger"));
const ShoppingComponent = lazy(() => import("./react-pages/Shopping"));
const ChatmintComponent = lazy(() => import("./react-pages/chat/Chatmint"));
const PortfolioComponent = lazy(() =>
  import("./react-pages/portfolio/Portfolio")
);
const AdminComponent = lazy(() => import("./react-pages/Admin/Admin.jsx"));
const LogInorSignInComponent = lazy(() =>
  import("./react-pages/logInOrSignIn/LoginSignupForm")
);

const SpinnerCentered = () => (
  <div style={{ minHeight: "300px", display: "grid", placeItems: "center" }}>
    <Spinner />
  </div>
);

const websitesRoutes = [
  { path: "blogger", element: <BloggerComponent /> },
  { path: "shopping", element: <ShoppingComponent /> },
  
];

const router = createBrowserRouter([
  {
    path: "/signUp",
    element: (
      <Suspense fallback={<SpinnerCentered />}>
        <LogInorSignInComponent isLogin={false} />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<SpinnerCentered />}>
        <LogInorSignInComponent isLogin={true} />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PortfolioComponent /> },
      {
        path: "home",
        element: (
          <Suspense fallback={<SpinnerCentered />}>
            <HomeComponent />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<SpinnerCentered />}>
            <AboutComponent />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<SpinnerCentered />}>
            <ContactComponent />
          </Suspense>
        ),
      },
      {
        path: "admin",
        element: <RequireAdmin />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SpinnerCentered />}>
                <AdminComponent />
              </Suspense>
            ),
          },
          { path: "*", element: <NotFound /> },
        ],
      },
      { path: "settings", element: <Suspense fallback={<SpinnerCentered />}><SettingsComponent /></Suspense> },
      { path: "chatmint", element: <Suspense fallback={<SpinnerCentered />}><ChatmintComponent /></Suspense> },
      ...websitesRoutes,
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function AppContent() {
  const isDark = useSelector((state) => state.theme.isDark); // ✅

  useEffect(() => {
    document.body.classList.toggle("light-theme", !isDark);
    document.body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#0077b5",
      colorBgBase: isDark ? "#161a20" : "#ffffff",
      colorTextBase: isDark ? "#f0f0f0" : "#1a1a1a",
      colorTextHeading: isDark ? "#f0f0f0" : "#000000",
      colorInfo: "#0077b5",
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
