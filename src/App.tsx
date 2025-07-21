import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    // <div className="App">
    //   <h1>问卷FE</h1>
    // </div>
    <RouterProvider router={router} />
  );
}
export default App;
