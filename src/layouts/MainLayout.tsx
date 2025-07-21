import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <>
      <div>Mainheader</div>

      <div>
        <Outlet />
      </div>

      <div>footer</div>
    </>
  );
};

export default MainLayout;
