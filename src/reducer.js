export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "updateInput":
      return {
        ...state,
        [payload.field]: payload.value
      };
    case "updateBars":
      return {
        ...state,
        bars: payload,
        duration: state.intervals * (state.rest + state.work)
      };
    case "startWorkout":
      return {
        ...state,
        working: true
      };
    case "finishWorkout":
      return {
        ...state,
        working: false
      };
    default:
      return state;
  }
}
