const db = require("./db");

const { ObjectID } = require("mongodb");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const getAll = async () => {
  const collection = await getCollection(db, "contacts");
  const result = await collection.find({}).toArray();
  return result;
};

const getContactById = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectID(contactId);
  const [result] = collection.find({ _id: objId }).toArray();
  return result;
};

const removeContact = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectID(contactId);
  const { value: result } = await collection.findOneAndUpdate({ _id: objId });
  return result;
};

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");

  const record = {
    ...body,
  };
  const {
    ops: [result],
  } = await collection.insertOne(record);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectID(contactId);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnOriginal: false }
  );
  return result;
};

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
