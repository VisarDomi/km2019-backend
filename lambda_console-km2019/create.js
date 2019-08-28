'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'KengaMagjike2019',
    Item: {
      Artist: data.Artist,
      SongTitle: data.SongTitle,
      AlbumTitle: data.AlbumTitle,
      CriticRating: data.CriticRating,
      Genre: data.Genre,
      Price: data.Price
    },
  };

  // write the item to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};