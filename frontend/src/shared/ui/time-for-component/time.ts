export const timeForComponent = (time: number) => {
  if (!time) return;
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) - hours * 60;
  const seconds = time % 60;

  const formattedWithHours = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');

  const formattedWithouthHours = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');

  return hours >= 1 ? formattedWithHours : formattedWithouthHours;
};
