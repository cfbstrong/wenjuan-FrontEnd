import React, { FC } from "react";
import { useLoadQuestionData } from "../../../hooks/useLoadQuestionData";

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();

  return (
    <div>
      stat page
      {/* <p>{loading ? <p>Loading...</p> : JSON.stringify(data)}</p> */}
    </div>
  );
};

export default Stat;
