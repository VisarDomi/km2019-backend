'use strict';
const shared = require('shared-package');
const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.delete = (event, context, callback) => {
  console.log("shared is", shared)
  console.log("shared.deleteDynamoDb is", shared.deleteDynamoDb)
  const data = JSON.parse(event.body);
  const TableName = process.env.TABLENAME;

  const params = {
    TableName,
    Key: {
      id: data.id
    },
  };
  shared.deleteDynamoDb(params, dynamoDb, callback)
};