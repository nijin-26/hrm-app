export const showToast = (type, msg, payloadObj) => {
  if (type === "warning") {
  } else if (type === "error") {
    console.log(msg, payloadObj);
  } else if (type === "success") {
  } else return;
};
