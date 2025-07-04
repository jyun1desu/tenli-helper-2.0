export const formatTimestampToDateString = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份從 0 開始
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};


