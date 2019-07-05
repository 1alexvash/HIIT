import React, { useReducer, useEffect, useRef } from "react";
import "./scss/main.css";

import noSleepLibrary from "nosleep.js";

import reducer from "./reducer";

import ready from "./sounds/ready.mp3";
import steady from "./sounds/steady.mp3";
import work from "./sounds/work.mp3";
import rest from "./sounds/rest.mp3";
import congratulations from "./sounds/congratulations.mp3";

const readySound = new Audio(ready);
const steadySound = new Audio(steady);
const workSound = new Audio(work);
const restSound = new Audio(rest);
const congratulationsSound = new Audio(congratulations);

const noSleep = new noSleepLibrary();

const initialState = {
  intervals: 3,
  work: 15,
  rest: 45,
  working: false,
  duration: undefined,
  bars: [],
  progressStatusText: "",
  progressStatusClass: "",
  soundsAvailable: true
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ball = useRef();

  function inputOnChange(e) {
    if (e.target.value !== "" && e.target.value !== "0") {
      const value = parseInt(e.target.value);
      e.target.value = value;
      const field = [e.target.name];
      dispatch({ type: "updateInput", payload: { field, value } });
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

    dispatch({ type: "startWorkout" });
    dispatch({
      type: "setWorkingStatus",
      payload: { text: "Ready", class: "white" }
    });
    playSound(readySound);
    setTimeout(() => {
      dispatch({
        type: "setWorkingStatus",
        payload: { text: "Steady", class: "white" }
      });
      playSound(steadySound);
    }, 1500);
    setTimeout(() => {
      // runSound.play();

      let timer;
      let turn = "Work";

      function changeTurn() {
        turn = turn === "Work" ? "Rest" : "Work";
      }

      function updateText() {
        dispatch({
          type: "setWorkingStatus",
          payload: {
            text: turn,
            class: turn === "Work" ? "red" : "green"
          }
        });
      }

      function playRoundMusic() {
        if (turn === "Work") {
          playSound(workSound);
        } else {
          playSound(restSound);
        }
      }

      let newInterval = delay => {
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
        dispatch({ type: "finishWorkout" });
        dispatch({
          type: "setWorkingStatus",
          payload: {
            text: "",
            class: "white"
          }
        });
        playSound(congratulationsSound);
        clearInterval(timer);
      }, state.duration * 1000);
    }, 3000);
  }

  function getWorkoutTime() {
    let seconds = state.duration % 60;
    if (seconds < 10) seconds = "0" + seconds;
    let minutes = Math.floor(state.duration / 60);
    let hours = Math.floor(state.duration / 3600);
    if (state.duration >= 3600) {
      minutes = minutes % 60;
      if (minutes < 10) minutes = "0" + minutes;
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }

  useEffect(() => {
    const { intervals, work, rest } = state;

    let bars = [];

    const duration = intervals * (rest + work) - rest;

    for (let index = 0; index < intervals; index++) {
      bars.push({
        type: "work",
        width: (work / duration) * 100
      });
      if (index + 1 < intervals) {
        bars.push({
          type: "rest",
          width: (rest / duration) * 100
        });
      }
    }
    dispatch({ type: "updateBars", payload: { bars, duration } });

    // eslint-disable-next-line
  }, [state.intervals, state.work, state.rest]);

  useEffect(() => {
    const { intervals, work, rest, soundsAvailable } = state;
    if (localStorage.settings === undefined) {
      localStorage.settings = JSON.stringify({
        intervals,
        work,
        rest,
        soundsAvailable
      });
    } else {
      dispatch({ type: "getSettings" });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {state.working === false ? (
        <form onSubmit={start}>
          <div className="intervals">
            Intervals:
            <input
              type="number"
              onChange={e => inputOnChange(e)}
              name="intervals"
              value={state.intervals}
              min="1"
              required
            />
          </div>
          <div className="rest-work">
            <section className="work">
              <label>
                Work <span>(s)</span>
              </label>
              <input
                type="number"
                onChange={e => inputOnChange(e)}
                name="work"
                value={state.work}
                placeholder="15 s"
                min="1"
                required
              />
            </section>
            <section className="rest">
              <label>
                Rest <span>(s)</span>
              </label>
              <input
                type="number"
                onChange={e => inputOnChange(e)}
                name="rest"
                value={state.rest}
                placeholder="45 s"
                min="1"
                required
              />
            </section>
          </div>
          <div className="duration">
            <em>Workout Duration:</em>
            <strong>{getWorkoutTime()}</strong>
          </div>
          <p className="sounds">
            <em>Sounds:</em>
            <input
              type="checkbox"
              name="sounds"
              checked={state.soundsAvailable}
              onChange={e =>
                dispatch({ type: "toggleSounds", payload: e.target.checked })
              }
            />
          </p>
          <div className="start">
            <button>Start</button>
          </div>
        </form>
      ) : (
        ""
      )}

      {state.progressStatusText ? (
        <p className={`status ${state.progressStatusClass}`}>
          {state.progressStatusText}
        </p>
      ) : (
        ""
      )}
      <div className="progress">
        {state.bars.map((bar, index) => (
          <div
            key={index}
            className={`bar ${bar.type === "rest" ? "rest" : "work"}`}
            style={{ width: bar.width + "%" }}
          />
        ))}
        <div className="ball" ref={ball} />
      </div>
    </div>
  );
};

export default App;
