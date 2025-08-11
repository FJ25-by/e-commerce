const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rokitprek:KyRiKnsiGNjmvrx9@belajar.1zdoxyb.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=belajar";

async function clearDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('ecommerce');

    const collections = await db.listCollections().toArray();
    for (let collection of collections) {
      await db.collection(collection.name).drop();
      console.log(`Collection ${collection.name} dropped`);
    }

    console.log('Database berhasil dibersihkan');
  } catch (err) {
    console.error('Gagal membersihkan database:', err);
  } finally {
    await client.close();
  }
}

clearDatabase();
