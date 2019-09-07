"use strict";
const uuid = require("uuid");
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.put = (event, context, callback) => {
  let Item = JSON.parse(event.body);
  let id = Item.id;
  delete Item.id;
  const TableName = Item.TableName;
  delete Item.TableName;
  if (id === undefined) {
    id = uuid();
  }
  Item = { ...Item, id };
  const params = { TableName, Item };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          "Content-Type": "plain/txt",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT"
        },
        body: "Couldn't post the item."
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT"
      },
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
};
