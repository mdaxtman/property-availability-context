const AWS = require("aws-sdk");

const awsCredsFromProfile = (profileName) => {
	var awsProfileCreds = new AWS.SharedIniFileCredentials({
		profile: profileName
	});
	if (awsProfileCreds && awsProfileCreds.accessKeyId) {
		return awsProfileCreds;
	}
};

const awsConfig = {
	region: process.env.AWS_REGION || "us-west-2",
	httpOptions: {
		agent: new(require("https").Agent)({
			keepAlive: true,
			keepAliveMsecs: 500,
			maxFreeSockets: 256
		})
	},
	credentials: awsCredsFromProfile("nordstrom-federated")
};

const dynamoDb = new AWS.DynamoDB(awsConfig);


// function getPropertyAvailabilities(propertyId) {
//
// }

function createAvailability(propertyId, date) {
  const params = {
    TableName: "property-availability",
    "Item": {
      "id" : {
         "S": propertyId + "-" + date[0]
      },
      "date": {
        "S": date[0]
      },
      "property_id": {
        "N": propertyId
      }
    }
  }

console.log("I'm in createAvailability!!!");

dynamoDb.putItem(params, function(err, data) {
    if (err) {
      console.log("BAD STUFF", err);
    }
    console.log("DATA!!!", data);
  });
}

module.exports = {
  createAvailability
}
