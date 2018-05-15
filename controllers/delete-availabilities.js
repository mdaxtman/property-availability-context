const dynamoDb = require("../database-config");
const groupDatesById = require("../utils/group-dates-by-id");
const isAvailableForAllDates = require("../utils/is-available-for-all-dates");
const moment = require("moment");

function paramFactory(propertyId, date) {
    return {
        TableName: "chaos-property-availability",
        Key : {
            "date": {
                "S": date
            },
            "property_id": {
                "N": propertyId
            }
        }
    };
}

function deleteAvailability(propertyId, range) {
    return Promise.resolve(range)
        .then(([from, to]) => {
            const current = moment(from);
            const dates = [];

            while (Math.abs(current.diff(to, "days"))) {
                dates.push(current.format("YYYY-MM-DD"));

                current.add(1, "days");
            }
            dates.push(to);
            console.log(dates);
            return dates;
        })
        .then((dates) => {
            const batchDeletes = dates.map(date => new Promise((resolve, reject) => {
                return dynamoDb
                    .deleteItem(
                        paramFactory(propertyId, date),
                        (err, data) => {
                            console.log(data);
                            if (err) {
                                reject(err);

                                return;
                            }

                            resolve(date);
                        }
                    )
            }))

            return Promise.all(batchDeletes);
        })
        .then((createdDates) => ({
            [propertyId]: createdDates
        }));
}

module.exports = {
    deleteAvailability
};