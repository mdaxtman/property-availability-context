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
        agent: new (require("https").Agent)({
            keepAlive: true,
            keepAliveMsecs: 500,
            maxFreeSockets: 256
        })
    },
    credentials: awsCredsFromProfile("nordstrom-federated")
};

const dynamoDb = new AWS.DynamoDB(awsConfig);

module.exports = dynamoDb;
