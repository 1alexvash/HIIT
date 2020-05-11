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
  updateInput: action((state, payload) => {
    const { field, value } = payload;

    let newSettings = JSON.parse(localStorage.settings);
    newSettings = {
      ...newSettings,
      [field]: value,
    };
    localStorage.settings = JSON.stringify(newSettings);
    state[field] = value;
  }),
  updateBars: action((state, payload) => {
    const { bars, duration } = payload;

    state.bars = bars;
    state.duration = duration;
  }),
  startWorkout: action((state) => {
    state.working = true;
    state.remainingTime = state.duration;
  }),
  setWorkingStatus: action((state, payload) => {
    state.progressStatusText = payload.text;
    state.progressStatusClass = payload.class;
  }),
  nextInterval: action((state) => {
    state.currentInterval = state.currentInterval + 1;
  }),
  remainingTypeReduceSecond: action((state) => {
    state.remainingTime = state.remainingTime - 1;
  }),
  finishWorkout: action((state) => {
    state.working = false;
    state.currentInterval = 0;
  }),
  getSettings: action((state, payload) => {
    const settings = JSON.parse(localStorage.settings);

    state.intervals = settings.intervals;
    state.rest = settings.rest;
    state.work = settings.work;
    state.soundsAvailable = settings.soundsAvailable;
  }),
  toggleSounds: action((state, payload) => {
    const settings = JSON.parse(localStorage.settings);
    settings.soundsAvailable = payload;
    localStorage.settings = JSON.stringify(settings);
    state.soundsAvailable = payload;
  }),
});

export default store;
