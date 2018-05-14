const createAvailability = require("./create-availabilities");
const getAvailability = require("./get-availabilities");

module.exports = {
    ...createAvailability,
    ...getAvailability
};
