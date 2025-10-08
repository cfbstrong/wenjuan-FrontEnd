import { useState } from "react";

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);

  //此hook不用返回具体数据，只要把拿到的数据存到redux中即可

  return waitingUserData;
}

export default useLoadUserData;
