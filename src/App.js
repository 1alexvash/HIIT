import React, { useEffect, useRef } from "react";
import "./scss/main.css";

import TimerSettings from "./components/TimerSettings/TimerSettings";
import WorkoutStatus from "./components/WorkoutStatus/WorkoutStatus";
import ProgressBar from "./components/ProgressBar/ProgressBar";

import noSleepLibrary from "nosleep.js";

import readySound from "./sounds/ready.mp3";
import steadySound from "./sounds/steady.mp3";
import workSound from "./sounds/work.mp3";
import restSound from "./sounds/rest.mp3";
import congratulationsSound from "./sounds/congratulations.mp3";

import { StoreProvider, useStoreState, useStoreActions } from "easy-peasy";

import store from "./store";

const noSleep = new noSleepLibrary();

const App = () => {
  const state = useStoreState((state) => state);

  const {
    updateBars,
    startWorkout,
    setWorkingStatus,
    nextInterval,
    remainingTypeReduceSecond,
    finishWorkout,
    getSettings,
  } = useStoreActions((actions) => actions);

  const ball = useRef();

  const playSound = (src) => {
    if (state.soundsAvailable) {
      var audio = new Audio(src);
      audio.play();
    }
  };

  function start(e) {
    e.preventDefault();

    noSleep.enable();

    ball.current.style.animation = `pushBall ${state.totalTime}s linear 3s`;

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
      }, state.totalTime * 1000);
    }, 3000);
  }

  useEffect(() => {
    const { intervals, work, rest } = state;

    let bars = [];

    const totalTime = intervals * (rest + work) - rest;

    for (let index = 0; index < intervals; index++) {
      bars.push({
        type: "work",
        width: (work / totalTime) * 100,
        duration: work,
      });
      if (index + 1 < intervals) {
        bars.push({
          type: "rest",
          width: (rest / totalTime) * 100,
          duration: rest,
        });
      }
    }
    updateBars({ bars, totalTime });

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

  return (
    <div className="App">
      {state.working === false ? (
        <TimerSettings start={start} state={state} />
      ) : (
        <WorkoutStatus state={state} />
      )}
      <ProgressBar bars={state.bars} ball={ball} />
    </div>
  );
};

export default () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
