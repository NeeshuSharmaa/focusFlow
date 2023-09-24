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

export const getDateInFormat = (timestamp) => {
  const currentDate = new Date(timestamp);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();

  return `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;
};

export const secsToHrs = (time) => time / 3600;
