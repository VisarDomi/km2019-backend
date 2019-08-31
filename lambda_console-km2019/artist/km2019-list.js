"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.list = (event, context, callback) => {
  const TableName = event.queryStringParameters.TableName;
  const Limit = 100;
  const params = { TableName, Limit };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the items."
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result)
    };
    callback(null, response);
  });
};
