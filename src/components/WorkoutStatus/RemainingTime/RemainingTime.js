import React from "react";
import getWorkoutTime from "../../../utils/getWorkoutTime";

const RemainingTime = ({ currentInterval, intervals, remainingTime }) => (
  <div className="remaining-time">
    <span>
      {currentInterval} / {intervals}
    </span>
    <span>{getWorkoutTime(remainingTime)}</span>
  </div>
);

export default RemainingTime;
