import React from "react";

import Intervals from "./Intervals/Intervals";
import Timing from "./Timing/Timing";
import WorkoutDuration from "./WorkoutDuration/WorkoutDuration";
import SoundsSettings from "./SoundsSettings/SoundsSettings";

const TimerSettings = ({ start, inputOnChange, state, dispatch }) => (
  <form onSubmit={start} className="timer-settings">
    <Intervals inputOnChange={inputOnChange} intervals={state.intervals} />
    <Timing inputOnChange={inputOnChange} work={state.work} rest={state.rest} />
    <WorkoutDuration duration={state.duration} />
    <SoundsSettings soundsAvailable={state.soundsAvailable} />
    <div className="start">
      <button type="submit">Start</button>
    </div>
  </form>
);

export default TimerSettings;
