const Contact = require("../model/contact");

const getAll = async (userId, query) => {
  // const result = await Contact.find({ owner: userId });

  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 20,
    offset = 0,
  } = query;
  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  const result = Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: { path: "owner", select: "name email subscription" },
  });
  return result;
};

const getContactById = async (userId, id) => {
  const result = Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "email subscription",
  });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contact.findOneAndRemove({
    _id: id,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription",
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body });
  return result;
};

const updateContact = async (id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
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
