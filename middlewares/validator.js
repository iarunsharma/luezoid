const mongoose = require("mongoose");
const validator = require("email-validator");

const isvalid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isvalidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const isValidSyntaxOfEmail = function (value) {
  if (!validator.validate(value)) {
    return false;
  }
  return true;
};

//--------------------------------------------------------------------------------------------------------------------//

module.exports = {
  isvalid,
  isvalidRequestBody,
  isValidObjectId,
  isValidSyntaxOfEmail,
};
