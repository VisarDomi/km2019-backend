"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.put = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const TableName = process.env.TABLENAME;

  const params = {
    TableName,
    Key: {
      id: data.id
    },
    UpdateExpression:
      "set Artist=:Artist, SongTitle=:SongTitle, AlbumTitle=:AlbumTitle, CriticRating=:CriticRating, Genre=:Genre, Price=:Price",
    ExpressionAttributeValues: {
      ":Artist": data.Artist,
      ":SongTitle": data.SongTitle,
      ":AlbumTitle": data.AlbumTitle,
      ":CriticRating": data.CriticRating,
      ":Genre": data.Genre,
      ":Price": data.Price
    },
    ReturnValues: "ALL_NEW"
  };

  dynamoDb.update(params, error => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't update the item."
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
};
