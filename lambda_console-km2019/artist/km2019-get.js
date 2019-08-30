"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.get = (event, context, callback) => {
  const TableName = event.queryStringParameters.TableName;
  const id = event.queryStringParameters.id;
  const params = { TableName, Key: { id } };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't get the item."
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
