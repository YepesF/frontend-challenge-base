export const parseDate = (dateString: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = dateString.split("-");

  if (!year || !month || day) {
    return "-";
  }

  return `${months[parseInt(month as string, 10) - 1]} ${parseInt(day as string, 10)}, ${year}`;
};

export const parseDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
