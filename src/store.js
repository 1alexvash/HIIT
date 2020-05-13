import { createStore, action } from "easy-peasy";

const store = createStore({
  intervals: 3,
  currentInterval: 0,
  work: 15,
  rest: 45,
  working: false,
  totalTime: undefined,
  timePassed: 0,
  remainingTime: undefined,
  bars: [],
  intervalsDuration: [],
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
    const { bars, totalTime } = payload;

    state.bars = bars;
    state.totalTime = totalTime;
  }),
  startWorkout: action((state) => {
    state.working = true;
    state.timePassed = 0;
    state.remainingTime = state.totalTime;

    state.intervalsDuration = state.bars.map((bar) => bar.duration);
    for (let i = 1; i < state.intervalsDuration.length; i++) {
      state.intervalsDuration[i] += state.intervalsDuration[i - 1];
    }
  }),
  setWorkingStatus: action((state, payload) => {
    state.progressStatusText = payload.text;
    state.progressStatusClass = payload.class;
  }),
  nextInterval: action((state) => {
    state.currentInterval = state.currentInterval + 1;
  }),
  remainingTypeReduceSecond: action((state) => {
    state.timePassed = state.timePassed + 1;
    state.remainingTime = state.totalTime - state.timePassed;
  }),
  finishWorkout: action((state) => {
    state.working = false;
    state.timePassed = 0;
    state.currentInterval = 0;
    state.intervalsDuration = [];
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
