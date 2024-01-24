export const formatTimestamp = (timestamp) => {
  const currentDate = new Date();
  const providedDate = new Date(timestamp);

  // Check if the provided date is today
  if (
    providedDate.getDate() === currentDate.getDate() &&
    providedDate.getMonth() === currentDate.getMonth() &&
    providedDate.getFullYear() === currentDate.getFullYear()
  ) {
    const hours = providedDate.getHours();
    const minutes = providedDate.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  // Check if the provided date is yesterday
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  if (
    providedDate.getDate() === yesterday.getDate() &&
    providedDate.getMonth() === yesterday.getMonth() &&
    providedDate.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  // Display the date in "dd/mm/yyyy" format
  const dd = String(providedDate.getDate()).padStart(2, "0");
  const mm = String(providedDate.getMonth() + 1).padStart(2, "0");
  const yyyy = providedDate.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const formatHoursAndMinutes = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};
