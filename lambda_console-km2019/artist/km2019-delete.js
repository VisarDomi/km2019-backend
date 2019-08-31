"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.delete = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const TableName = data.TableName;
  const Key = { id: data.id };
  const params = {
    TableName,
    Key
  };

  dynamoDb.delete(params, (error, result) => {
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't delete the item."
      });
      return;
    }

    const response = {
      statusCode: 200
    };
    callback(null, response);
  });
};
