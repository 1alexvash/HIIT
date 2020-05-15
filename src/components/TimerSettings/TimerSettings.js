import React from "react";

import Intervals from "./Intervals/Intervals";
import Timing from "./Timing/Timing";
import WorkoutDuration from "./WorkoutDuration/WorkoutDuration";
import SoundsSettings from "./SoundsSettings/SoundsSettings";

import { useStoreActions } from "easy-peasy";

const TimerSettings = ({ start, state, dispatch }) => {
  const { updateInput } = useStoreActions((actions) => actions);

  function inputOnChange(e) {
    if (e.target.value !== "" && e.target.value !== "0") {
      const value = parseInt(e.target.value);
      e.target.value = value;
      const field = [e.target.name];
      updateInput({ field, value });
    }
  }

  return (
    <form onSubmit={start} className="timer-settings">
      <Intervals inputOnChange={inputOnChange} intervals={state.intervals} />
      <Timing
        inputOnChange={inputOnChange}
        work={state.work}
        rest={state.rest}
      />
      <WorkoutDuration totalTime={state.totalTime} />

      <SoundsSettings
        soundsAvailable={state.soundsAvailable}
        dispatch={dispatch}
      />
      <div className="start">
        <button type="submit">Start</button>
      </div>
    </form>
  );
};

export default TimerSettings;
