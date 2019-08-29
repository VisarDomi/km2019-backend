'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.post = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'KM2019-Artist',
    Item: {
      Artist: data.Artist,
      SongTitle: data.SongTitle,
      AlbumTitle: data.AlbumTitle,
      CriticRating: data.CriticRating,
      Genre: data.Genre,
      Price: data.Price
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t post the item.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};