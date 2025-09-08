const { MongoClient } = require('mongodb');

async function main() {
  // Connection URI
  const uri = "mongodb+srv://tayobakare17_db_user:lIGBpUOmXkinLuD1@cluster0.nojm8un.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    await createMultipleListings(client, [ 
        {name: "Lovely Loft", summary: "A charming loft in Paris", bedrooms: 1, bathrooms: 1},
        {name: "Spacious Suite", summary: "A luxurious suite in New York", bedrooms: 2, bathrooms: 2},
        {name: "Cozy Cottage", summary: "A quaint cottage in the countryside", bedrooms: 3, bathrooms: 3}
    
    ]);

  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);

async function createMultipleListings(client, newListings){
  const result = await client.db("sample_airbnb").collection("listingsAndReviews")
  .insertMany(newListings);
  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

async function createListing(client, newListing){
  const result = await client.db("sample_airbnb").collection("listingsAndReviews")
  .insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
} 

async function listDatabases(client){
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => {
      console.log(` - ${db.name}`);
  });
}