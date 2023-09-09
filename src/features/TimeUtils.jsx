export const getTimeMMSS = (time) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
};

export const getTimeHHMMSS = (time) => {
  const hr = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;
  return `${hr < 10 ? "0" + hr : hr} : ${mins < 10 ? "0" + mins : mins} : ${
    secs < 10 ? "0" + secs : secs
  }`;
};
