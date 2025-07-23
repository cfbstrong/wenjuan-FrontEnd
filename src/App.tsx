import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "@ant-design/v5-patch-for-react-19"; // 解决antd5与react18的兼容性问题

function App() {
  return (
    // <div className="App">
    //   <h1>问卷FE</h1>
    // </div>
    <RouterProvider router={router} />
  );
}
export default App;
