const Contact = require("../model/contact");

const getAll = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (contactId) => {
  const result = Contact.findOne({ _id: contactId });
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
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
