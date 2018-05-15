const dynamoDb = require("../database-config");
const groupDatesById = require("../utils/group-dates-by-id");
const isAvailableForAllDates = require("../utils/is-available-for-all-dates");

function getAvailabilityForAllProperties([from, to]) {
  return new Promise((resolve, reject) => {

    const params = {
      TableName: "chaos-property-availability",
      FilterExpression: `#d BETWEEN :date1 and :date2`,
      ExpressionAttributeValues: {
        ":date1": {
          "S": from.toString()
        },
        ":date2": {
          "S": to.toString()
        }
      },
      ExpressionAttributeNames: {
        "#d": "date"
      }
    };

    dynamoDb.scan(params, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(groupDatesById(res));
    });
  });
}

function getAvailabilityForProperty(id, [from, to]) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "chaos-property-availability",
      // FilterExpression: `#d BETWEEN :date1 and :date2`,
      KeyConditionExpression: "property_id = :propId AND #d BETWEEN :date1 AND :date2",
      ExpressionAttributeValues: {
        ":date1": {
          "S": from.toString()
        },
        ":date2": {
          "S": to.toString()
        },
        ":propId": {
          "N": id
        }
      },
      ExpressionAttributeNames: {
        "#d": "date"
      }
    };
    dynamoDb.query(params, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(groupDatesById(res));
    });
  });
}

function isAvailable(id, range) {

 return getAvailabilityForProperty(id, range)
  .then(results => console.log("RESULTS!!!", results) || isAvailableForAllDates(range, results[id]))
}


module.exports = {
  getAvailabilityForAllProperties,
  getAvailabilityForProperty,
  isAvailable
}
