import React from "react";
import Bars from "./Bars/Bars";

const ProgressBar = ({ bars, ball, canStart }) => (
  <div className={`progress-bar ${canStart ? "" : "not-active"}`}>
    <Bars bars={bars} />
    <div className="ball" ref={ball} />
  </div>
);

export default ProgressBar;
