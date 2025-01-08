export const formatDate = (timestamp, reverse = false) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  if (reverse) return `${year}-${month}-${day}`;
  return `${day}-${month}-${year}`;
};