const createAvailability = require("./create-availabilities");
const getAvailability = require("./get-availabilities");
const deleteAvailability = require("./delete-availabilities");

module.exports = {
    ...deleteAvailability,
    ...createAvailability,
    ...getAvailability
};
