const Contacts = require("../repositories/contacts");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: contacts, ...rest } = await Contacts.getAll(
      userId,
      req.query
    );
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { contacts, ...rest },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    }
    return res.json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact(userId, req.body);
    return res
      .status(201)
      .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
  } catch (e) {
    if (e.name === "ValidationError") {
      e.status = 400;
    }
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCodes.OK,
        message: "contact deleted",
      });
    }
    return res.json({
      status: "error",
      code: HttpCodes.NOT_FOUND,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.id,
      req.body
    );
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCodes.OK,
        data: { contact },
      });
    }
    return res.json({
      status: "error",
      code: HttpCodes.NOT_FOUND,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

// router.patch(
//   "/:id/favorite",
//   validationUpdateContact,
//   async (req, res, next) => {
//     try {
//       const contact = await Contacts.updateContact(
//         req.params.contactId,
//         req.body
//       );
//       if (contact) {
//         return res.json({ status: "success", code: 200, data: { contact } });
//       }
//       return res.json({ status: "error", code: 404, message: "Not found" });
//     } catch (e) {
//       next(e);
//     }
//   }
// );

module.exports = {
  getAll,
  getContactById,
  updateContact,
  removeContact,
  addContact,
};
