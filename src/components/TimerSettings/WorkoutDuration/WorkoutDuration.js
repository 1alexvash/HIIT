import React from "react";
import getWorkoutTime from "../../../utils/getWorkoutTime";

const WorkoutDuration = ({ duration }) => (
  <div className="workout-duration">
    <em>Workout Duration:</em>
    <strong>{getWorkoutTime(duration)}</strong>
  </div>
);

export default WorkoutDuration;
