export const formatTimeRange = (startTime, endTime) => {
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const formattedStartTime = convertTo12HourFormat(startTime);
  const formattedEndTime = convertTo12HourFormat(endTime);
  return `${formattedStartTime} to ${formattedEndTime}`;
};
