type TimeObject = {
  timezone: string;
  time: string;
}

export const convertToLocalDateTime = (timeObject: TimeObject): string => {
  const utcDate = new Date(timeObject.time);
  const localDate = utcDate.toLocaleString("en-US", {
      timeZone: timeObject.timezone,
      month: "long",
      day: "numeric",
      year: "numeric"
  });

  return localDate;
};