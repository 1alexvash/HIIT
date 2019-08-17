import React, { Fragment } from "react";
import RemainingTime from "./RemainingTime/RemainingTime";
import StatusText from "./StatusText/StatusText";

const WorkoutStatus = ({ state }) => (
  <Fragment>
    <RemainingTime
      currentInterval={state.currentInterval}
      intervals={state.intervals}
      remainingTime={state.remainingTime}
    />
    <StatusText
      progressStatusClass={state.progressStatusClass}
      progressStatusText={state.progressStatusText}
    />
  </Fragment>
);

export default WorkoutStatus;
