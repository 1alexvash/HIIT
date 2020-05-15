import React from "react";
import getWorkoutTime from "../../../utils/getWorkoutTime";

const WorkoutDuration = ({ totalTime }) => (
  <div className="workout-duration">
    <em>Workout Duration:</em>
    <strong>{getWorkoutTime(totalTime)}</strong>
  </div>
);

export default WorkoutDuration;
