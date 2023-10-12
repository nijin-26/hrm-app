export const getFormattedDate = (timestamp) => {
  // const dateFormatOptions = {
  //   day: "2-digit",
  //   month: "long",
  //   year: "numeric",
  // };
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // const formattedDate = new Date(year, month - 1, day);

  return [`${day} ${month} ${year}`, date.toISOString().slice(0, 10)];
  // return new Date(timestamp).toLocaleDateString("en-US", dateFormatOptions);
};
