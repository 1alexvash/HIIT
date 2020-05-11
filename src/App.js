import React, { Fragment, useEffect, useRef } from "react";
import "./scss/main.css";

import TimerSettings from "./components/TimerSettings/TimerSettings";
import WorkoutStatus from "./components/WorkoutStatus/WorkoutStatus";
import Bars from "./components/Bars/Bars";

import noSleepLibrary from "nosleep.js";

import ready from "./sounds/ready.mp3";
import steady from "./sounds/steady.mp3";
import work from "./sounds/work.mp3";
import rest from "./sounds/rest.mp3";
import congratulations from "./sounds/congratulations.mp3";

import { StoreProvider, useStoreState, useStoreActions } from "easy-peasy";

import store from "./store";

const readySound = new Audio(ready);
const steadySound = new Audio(steady);
const workSound = new Audio(work);
const restSound = new Audio(rest);
const congratulationsSound = new Audio(congratulations);

const noSleep = new noSleepLibrary();

const App = () => {
  const state = useStoreState((state) => state);

  const {
    updateInput,
    updateBars,
    startWorkout,
    setWorkingStatus,
    nextInterval,
    remainingTypeReduceSecond,
    finishWorkout,
    getSettings,
  } = useStoreActions((actions) => actions);

  const ball = useRef();

  function inputOnChange(e) {
    if (e.target.value !== "" && e.target.value !== "0") {
      const value = parseInt(e.target.value);
      e.target.value = value;
      const field = [e.target.name];
      updateInput({ field, value });
    }
  }

  function playSound(sound) {
    if (state.soundsAvailable) {
      sound.play();
      sound.currentTime = 0;
    }
  }

  function start(e) {
    e.preventDefault();

    noSleep.enable();

    ball.current.style.animation = `pushBall ${state.duration}s linear 3s`;

    startWorkout();
    setWorkingStatus({ text: "Ready", class: "white" });
    playSound(readySound);
    setTimeout(() => {
      setWorkingStatus({ text: "Steady", class: "white" });
      playSound(steadySound);
    }, 1500);
    setTimeout(() => {
      nextInterval();
      let remainingTimerReducer = setInterval(() => {
        remainingTypeReduceSecond();
      }, 1000);

      let timer;
      let turn = "Work";

      function changeTurn() {
        turn = turn === "Work" ? "Rest" : "Work";
      }

      function updateText() {
        setWorkingStatus({
          text: turn,
          class: turn === "Work" ? "red" : "green",
        });
      }

      function playRoundMusic() {
        if (turn === "Work") {
          playSound(workSound);
          nextInterval();
        } else {
          if (state.intervals > 1) {
            playSound(restSound);
          }
        }
      }

      let newInterval = (delay) => {
        timer = setTimeout(() => {
          changeTurn();
          updateText();
          const nextRoundTime = turn === "Work" ? state.work : state.rest;
          playRoundMusic();
          clearInterval(timer);
          newInterval(nextRoundTime);
        }, delay * 1000);
      };

      updateText();
      newInterval(state.work);
      playSound(workSound);

      setTimeout(() => {
        noSleep.disable();
        ball.current.style.animation = "";
        finishWorkout();
        clearInterval(remainingTimerReducer);
        setWorkingStatus({
          text: "",
          class: "white",
        });
        playSound(congratulationsSound);
        clearInterval(timer);
      }, state.duration * 1000);
    }, 3000);
  }

  useEffect(() => {
    const { intervals, work, rest } = state;

    let bars = [];

    const duration = intervals * (rest + work) - rest;

    for (let index = 0; index < intervals; index++) {
      bars.push({
        type: "work",
        width: (work / duration) * 100,
      });
      if (index + 1 < intervals) {
        bars.push({
          type: "rest",
          width: (rest / duration) * 100,
        });
      }
    }
    updateBars({ bars, duration });

    // eslint-disable-next-line
  }, [state.intervals, state.work, state.rest]);

  useEffect(() => {
    const { intervals, work, rest, soundsAvailable } = state;
    if (localStorage.settings === undefined) {
      localStorage.settings = JSON.stringify({
        intervals,
        work,
        rest,
        soundsAvailable,
      });
    } else {
      getSettings();
    }
    // eslint-disable-next-line
  }, []);

  // const start = () => {};
  // const inputOnChange = () => {};

  return (
    <div className="App">
      {state.working === false ? (
        <TimerSettings
          start={start}
          inputOnChange={inputOnChange}
          state={state}
        />
      ) : (
        <Fragment>
          <WorkoutStatus state={state} />
        </Fragment>
      )}

      <div className="progress">
        <Bars bars={state.bars} />
        <div className="ball" ref={ball} />
      </div>
    </div>
  );
};

export default () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
