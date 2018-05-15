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
            const last = moment(to).format();
            const current = moment(from);
            const dates = [];

            while (Math.abs(current.diff(last, "days"))) {
                dates.push(current.format());

                current.add(1, "days");
            }

            dates.push(last);

            return dates;
        })
        .then((dates) => {
            const batchPuts = dates.map(date => new Promise((resolve) => {
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
    
    
    
    
    
    
    
    
    
    
    
    
        dynamoDb.putItem(params, function (err, data) {
        if (err) {
            console.log("BAD STUFF", err);
        }
        console.log("DATA!!!", data);
    });
}

module.exports = {
    createAvailability
};
