import { createStore, action } from "easy-peasy";

const store = createStore({
  intervals: 3,
  currentInterval: 0,
  work: 15,
  rest: 45,
  working: false,
  duration: undefined,
  remainingTime: undefined,
  bars: [],
  progressStatusText: "",
  progressStatusClass: "",
  soundsAvailable: true,
  dispatch: action((state, action) => {
    const { type, payload } = action;

    switch (type) {
      case "updateInput":
        let newSettings = JSON.parse(localStorage.settings);
        newSettings = {
          ...newSettings,
          [payload.field]: payload.value,
        };
        localStorage.settings = JSON.stringify(newSettings);
        return {
          ...state,
          [payload.field]: payload.value,
        };
      case "updateBars":
        const { bars, duration } = payload;
        return {
          ...state,
          bars: bars,
          duration: duration,
        };
      case "startWorkout":
        return {
          ...state,
          working: true,
          remainingTime: state.duration,
        };
      case "setWorkingStatus":
        return {
          ...state,
          progressStatusText: payload.text,
          progressStatusClass: payload.class,
        };
      case "nextInterval": {
        return {
          ...state,
          currentInterval: state.currentInterval + 1,
        };
      }
      case "remainingTypeReduceSecond":
        return {
          ...state,
          remainingTime: state.remainingTime - 1,
        };
      case "finishWorkout":
        return {
          ...state,
          working: false,
          currentInterval: 0,
        };
      case "getSettings":
        const settings = JSON.parse(localStorage.settings);
        return {
          ...state,
          intervals: settings.intervals,
          rest: settings.rest,
          work: settings.work,
          soundsAvailable: settings.soundsAvailable,
        };
      case "toggleSounds": {
        const settings = JSON.parse(localStorage.settings);
        settings.soundsAvailable = payload;
        localStorage.settings = JSON.stringify(settings);
        return {
          ...state,
          soundsAvailable: payload,
        };
      }
      default:
        return state;
    }
  }),
});

export default store;
