import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Docs from "./pages/Docs"

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
