import React from "react";
import Bars from "./Bars/Bars";

const ProgressBar = ({ bars, ball }) => (
  <div className="progress-bar">
    <Bars bars={bars} />
    <div className="ball" ref={ball} />
  </div>
);

export default ProgressBar;
