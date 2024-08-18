import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Docs from "./pages/Docs"
import TwitterAuthCallback from "./pages/TwitterAuthCallback";
import Invest from "./pages/Invest";
import Mint from "./pages/Mint";
import MiningMachine from "./pages/MiningMachine";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "docs",
        element: <Docs />,
      },
      {
        path: "invest",
        element: <Invest />,
      },
      {
        path: "mining_machine",
        element: <MiningMachine />,
      },
      {
        path: "twitter_auth_callback",
        element: <TwitterAuthCallback />,
      },
      {
        path: "mint_without_twitter",
        element: <Mint />,
      }
    ],
  },
];

const renderRoutes = (routes) => {
  return (
    <>
      {routes.map((item, index) => {
        if (item.children) {
          return (
            <Route
              path={item.path}
              element={item.element}
              key={index + item.path}
            >
              {renderRoutes(item.children)}
            </Route>
          );
        }
        return (
          <Route
            path={item.path}
            element={item.element}
            key={index + item.path}
          />
        );
      })}
    </>
  );
};

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default Router;
