import React, { Fragment } from "react";
import RemainingTime from "./RemainingTime/RemainingTime";
import StatusText from "./StatusText/StatusText";

const WorkoutStatus = ({ state }) => (
  <Fragment>
    <RemainingTime />
    <StatusText />
  </Fragment>
);

export default WorkoutStatus;
