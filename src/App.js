import React, { useReducer, useEffect, useRef } from "react";
import "./scss/main.css";

import reducer from "./reducer";

const initialState = {
  intervals: 3,
  work: 15,
  rest: 45,
  working: false,
  duration: undefined,
  bars: []
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

  function start(e) {
    e.preventDefault();

    ball.current.style.animation = `pushBall ${state.duration}s linear`;

    dispatch({ type: "startWorkout" });
    setTimeout(() => {
      ball.current.style.animation = "";
      dispatch({ type: "finishWorkout" });
    }, state.duration * 1000);
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
    for (let index = 0; index < intervals; index++) {
      bars.push(
        {
          type: "rest",
          width: (100 / intervals) * (rest / (rest + work))
        },
        {
          type: "work",
          width: (100 / intervals) * (work / (rest + work))
        }
      );
    }
    dispatch({ type: "updateBars", payload: bars });

    // eslint-disable-next-line
  }, [state.intervals, state.work, state.rest]);

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
          </div>
          <div className="duration">
            <em>Workout Duration:</em>
            <strong>{getWorkoutTime()}</strong>
          </div>
          <div className="start">
            <button>Start</button>
          </div>
        </form>
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
