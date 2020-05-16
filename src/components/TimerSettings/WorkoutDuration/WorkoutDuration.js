import React from "react";
import getWorkoutTime from "../../../utils/getWorkoutTime";

const WorkoutDuration = ({ totalTime, canStart }) => (
  <div className="workout-duration">
    <em>Workout Duration:</em>
    <strong>{canStart && getWorkoutTime(totalTime)}</strong>
  </div>
);

export default WorkoutDuration;
