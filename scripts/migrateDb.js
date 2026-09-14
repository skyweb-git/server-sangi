import mongoose from 'mongoose';

const OLD_URI = 'mongodb+srv://inch34915_db_user:CYH6kIVgo3CB8jZN@cluster0.7wkvbg0.mongodb.net/maytri_crm?appName=Cluster0';
const NEW_URI = 'mongodb+srv://inchinchwebsupport_db_user:QdpWAwRglHScxoTJ@cluster0.ooh9ejp.mongodb.net/maytri_crm?retryWrites=true&w=majority&appName=Cluster0';

async function migrate() {
  console.log('Connecting to old DB...');
  const oldConn = await mongoose.createConnection(OLD_URI).asPromise();
  console.log('✅ Connected to old DB');

  console.log('Connecting to new DB...');
  const newConn = await mongoose.createConnection(NEW_URI).asPromise();
  console.log('✅ Connected to new DB');

  const collections = await oldConn.db.listCollections().toArray();
  console.log('Found collections in old DB:', collections.map(c => c.name));

  for (const col of collections) {
    const colName = col.name;
    if (colName.startsWith('system.')) continue;

    const oldCollection = oldConn.db.collection(colName);
    const newCollection = newConn.db.collection(colName);

    const docs = await oldCollection.find({}).toArray();
    console.log('Migrating ' + docs.length + ' docs from collection: ' + colName);

    if (docs.length > 0) {
      await newCollection.deleteMany({});
      await newCollection.insertMany(docs);
      console.log('✅ Successfully copied ' + docs.length + ' docs into ' + colName);
    }
  }

  console.log('🎉 Migration completed successfully!');
  await oldConn.close();
  await newConn.close();
  process.exit(0);
}

migrate().catch(err => {
  console.error('❌ Migration Error:', err);
  process.exit(1);
});
