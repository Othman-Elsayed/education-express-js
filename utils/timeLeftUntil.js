export function timeLeftUntil(targetTime, targetDay) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const targetDayIndex = daysOfWeek.findIndex(
    (day) => day.toLowerCase() === targetDay.toLowerCase()
  );
  if (targetDayIndex === -1) {
    throw new Error("Invalid day provided.");
  }
  const [targetHour, targetMinute] = targetTime.split(":").map(Number);
  const target = new Date(now);
  target.setHours(targetHour, targetMinute, 0, 0);
  target.setDate(now.getDate() + ((targetDayIndex + 7 - now.getDay()) % 7));
  if (target <= now) {
    target.setDate(target.getDate() + 7);
  }
  const difference = target - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `finished after: [${days} Days] <-> [${
    hours < 10 ? `0${hours}` : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  } hours, minutes, seconds]`;
}
