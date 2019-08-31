"use strict";
const shared = require("shared-package");
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.put = async (event, context, callback) => {
  await shared.postDynamoDb(event, callback, dynamoDb);
};
