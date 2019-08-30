module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'PrometheonMusic',
    Key: {
      Artist: data.Artist,
      SongTitle: data.SongTitle,
    },
    UpdateExpression: "set AlbumTitle=:AlbumTitle, CriticRaging-:CriticRating, Genre=:Genre, Price=:Price",
    ExpressionAttributeValues:{
      "AlbumTitle": data.AlbumTitle,
      "CriticRating": data.CriticRating,
      "Genre": data.Genre,
      "Price": data.Price
    },
    ReturnValues:"ALL_NEW"
  };
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// use await sleep(1000) to wait for 1 second


async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    if (i === 3)
      await sleep(2000);
    console.log(i);
  }
}

demo();