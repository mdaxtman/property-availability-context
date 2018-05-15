const moment = require("moment");

function isAvailableForAllDates([from, to], dates) {

  if (!dates.length) {
    return false;
  }
  const datesNeeded = Math.abs(moment(from).diff(to, "days")) + 1;
  return dates.length === datesNeeded;
}

module.exports = isAvailableForAllDates;
