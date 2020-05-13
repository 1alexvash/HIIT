import React from "react";

import { useStoreState } from "easy-peasy";

const StatusText = () => {
  const { progressStatusClass, progressStatusText } = useStoreState(
    (state) => state
  );

  return (
    <p className={`status ${progressStatusClass}`}>{progressStatusText}</p>
  );
};

export default StatusText;
