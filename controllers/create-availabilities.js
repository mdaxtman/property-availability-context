const dynamoDb = require("../database-config");

function createAvailability(propertyId, date) {
    const params = {
        TableName: "chaos-property-availability",
        "Item": {
            "id": {
                "S": propertyId + "-" + date[0]
            },
            "date": {
                "S": date[0]
            },
            "property_id": {
                "N": propertyId
            }
        }
    };

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
