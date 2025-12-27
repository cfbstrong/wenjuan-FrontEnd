import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
// import Edit from "../pages/question/Edit/index";
// import Stat from "../pages/question/Stat/index";
import NotFound from "../pages/NotFound";

// 路演懒加载，拆分bundle，优化首页体积
const Edit = lazy(
  () =>
    import(/* webpackChunkName: "editPage" */ "../pages/question/Edit/index")
);
const Stat = lazy(
  () =>
    import(/* webpackChunkName: "statPage" */ "../pages/question/Stat/index")
);

// Remember（important）: children is <Outlet/> component; put it in the layout component.
// <Outlet> --> children component
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        // 404配置都写在最后，来兜底
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;

export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";
