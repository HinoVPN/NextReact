const { MongoClient, ServerApiVersion } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  

  async function connection(){
    let conn;
    try {
      conn = await client.connect();
    } catch(e) {
      console.error(e);
    }
    
    let db = conn.db("sample_training");
    return db
  }
  
  
  module.exports = connection()
//   export default connection();