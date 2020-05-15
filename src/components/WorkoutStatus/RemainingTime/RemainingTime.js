import React from "react";
import getWorkoutTime from "../../../utils/getWorkoutTime";

import { useStoreState } from "easy-peasy";

const RemainingTime = ({}) => {
  const {
    currentInterval,
    intervals,
    remainingTime,
    intervalsDuration,
    timePassed,
  } = useStoreState((state) => state);

  const getIntervalTime = () => {
    let index = 0;
    intervalsDuration.forEach((x, i) => {
      if (x <= timePassed) {
        index = i + 1;
      }
    });
    return intervalsDuration[index] - timePassed;
  };

  return (
    <div className="remaining-time">
      <p>
        {currentInterval} / {intervals}
      </p>
      <p>{getIntervalTime()}s</p>
      <p>{getWorkoutTime(remainingTime)}</p>
    </div>
  );
};

export default RemainingTime;
