const { formatDMY } = require("./data");

function formatDateRange(activity) {
  if (!activity.startDate || !activity.endDate) return "";
  const start = formatDMY(activity.startDate);
  const end = formatDMY(activity.endDate);
  const days = activity.duration || 0;
  return `${start} to ${end}, ${days} day${days > 1 ? "s" : ""}`;
}

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks.length > 0 ? chunks : [[]];
}

module.exports = { formatDateRange, chunkArray };
