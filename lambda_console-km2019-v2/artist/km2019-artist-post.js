"use strict";
const shared = require("shared-package");
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.post = (event, context, callback) => {
  shared.postDynamoDb(event, callback, dynamoDb);
};
