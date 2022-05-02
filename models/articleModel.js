const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    websiteId: {
      type: ObjectId,
      ref: "Website",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
