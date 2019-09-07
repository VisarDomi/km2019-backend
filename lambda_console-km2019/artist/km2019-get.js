"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.get = (event, context, callback) => {
  const TableName = event.queryStringParameters.TableName;
  const Limit = parseInt(event.queryStringParameters.Limit);
  const id = event.queryStringParameters.id;
  let params = {};
  if (id === undefined) {
    params = { TableName, Limit };
    dynamoDb.scan(params, (error, result) => {
      if (error) {
        console.log(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: {
            'Content-Type': 'plain/txt',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
          },
          body: "Couldn't fetch the items."
        });
        return;
      }

      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET'
        },
        body: JSON.stringify(result)
      };
      callback(null, response);
    });
  }
  else {
    params = { TableName, Key: { id } };
    dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: {
            'Content-Type': 'plain/txt',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
          },
          body: "Couldn't fetch the items."
        });
        return;
      }
      if (Object.keys(result).length === 0) {
        const response = {
          statusCode: 404,
          headers: {
            'Content-Type': 'plain/txt',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
          },
          body: "Item with that id does not exist"
        };
        callback(null, response);
      }
      else {
        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
          },
          body: JSON.stringify(result)
        };
        callback(null, response);
      }

    });
  }
};
