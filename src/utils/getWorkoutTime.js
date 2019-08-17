export default function getWorkoutTime(time) {
  let seconds = time % 60;
  if (seconds < 10) seconds = "0" + seconds;
  let minutes = Math.floor(time / 60);
  let hours = Math.floor(time / 3600);
  if (time >= 3600) {
    minutes = minutes % 60;
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
