dynamoDb = require("../database-config");

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
      
      resolve(res);
    });
  });

}

module.exports = {
  getAvailabilityForAllProperties
}
