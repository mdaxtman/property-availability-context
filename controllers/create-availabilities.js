const dynamoDb = require("../database-config");
const moment = require("moment");

function paramFactory(propertyId, date) {
    return {
        TableName: "chaos-property-availability",
        "Item": {
            "date": {
                "S": date
            },
            "property_id": {
                "N": propertyId
            }
        }
    };
}

function createAvailability(propertyId, range) {
    return Promise.resolve(range)
        .then(([from, to]) => {
            const current = moment(from);
            const dates = [];

            while (Math.abs(current.diff(to, "days"))) {
                dates.push(current.format("YYYY-MM-DD"));

                current.add(1, "days");
            }
            dates.push(to);
            return dates;
        })
        .then((dates) => {
            const batchPuts = dates.map(date => new Promise((resolve, reject) => {
                return dynamoDb
                    .putItem(
                        paramFactory(propertyId, date),
                        (err, data) => {
                            if (err) {
                                reject(err);

                                return;
                            }

                            resolve(date);
                        }
                    )
            }))

            return Promise.all(batchPuts);
        })
        .then((createdDates) => ({
            [propertyId]: createdDates
        }));
}

module.exports = {
    createAvailability
};
