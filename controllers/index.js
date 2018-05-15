const createAvailability = require("./create-availabilities");
const getAvailability = require("./get-availabilities");
const deleteAvailability = require("./delete-availabilities");
const _ = require("lodash");

module.exports = _.assign(
    {},
    deleteAvailability,
    createAvailability,
    getAvailability
);
