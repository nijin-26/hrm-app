export const getFormattedDate = (timestamp) => {
  const dateFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Date(timestamp).toLocaleDateString("en-US", dateFormatOptions);
};
