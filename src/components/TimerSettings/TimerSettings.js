import React from "react";

import Intervals from "./Intervals/Intervals";
import Timing from "./Timing/Timing";
import WorkoutDuration from "./WorkoutDuration/WorkoutDuration";
import SoundsSettings from "./SoundsSettings/SoundsSettings";

import { useStoreActions } from "easy-peasy";

const TimerSettings = ({ start, state }) => {
  const { intervals, work, rest, totalTime, soundsAvailable, canStart } = state;

  const { updateInput } = useStoreActions((actions) => actions);

  function inputOnChange(e) {
    let value = parseInt(e.target.value);
    e.target.value = value;
    const field = [e.target.name];

    if (!value > 0) {
      value = 0;
    }

    updateInput({ field, value });
  }

  return (
    <form onSubmit={start} className="timer-settings">
      <Intervals inputOnChange={inputOnChange} intervals={intervals} />
      <Timing inputOnChange={inputOnChange} work={work} rest={rest} />
      <WorkoutDuration totalTime={totalTime} canStart={canStart} />
      <SoundsSettings soundsAvailable={soundsAvailable} />
      <div className={`start ${!canStart ? "disabled" : ""}`}>
        <button type="submit">Start</button>
      </div>
    </form>
  );
};

export default TimerSettings;
