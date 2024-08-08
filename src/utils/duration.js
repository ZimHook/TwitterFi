export const formatDuration = (duration) => {
  const hour = Math.floor(duration / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((duration % (1000 * 60 * 60)) / 1000 / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor((duration % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  return hour + ":" + minute + ":" + sec;
};