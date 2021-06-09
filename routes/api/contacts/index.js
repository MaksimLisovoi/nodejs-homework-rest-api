const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");
// const passport = require("passport");

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validateMongoId,
} = require("./validation");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router
  .get("/", guard, ctrl.getAll)
  .post("/", guard, validationCreateContact, ctrl.addContact);

router
  .get("/:contactId", guard, validateMongoId, ctrl.getContactById)
  .delete("/:contactId", guard, validateMongoId, ctrl.removeContact)
  .put(
    "/:contactId",
    guard,
    validateMongoId,
    validationUpdateContact,
    ctrl.updateContact
  );

router.patch(
  "/:contactId/favorite",
  guard,
  validationUpdateStatusContact,
  ctrl.updateContact
);

module.exports = router;
