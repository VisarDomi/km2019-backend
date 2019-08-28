'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.get = (event, context, callback) => {
  const data = event.queryStringParameters;

  const params = {
    TableName: 'KengaMagjike2019',
    Key: {
      Artist: data.Artist,
      SongTitle: data.SongTitle
    },
  }
  
  // fetch item from DynamoDB
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t get the item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null, response);
  });
};