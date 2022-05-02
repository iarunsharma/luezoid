const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("../middlewares/validator");

//======================== log in admin =================================================================================//

const login = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide data to signIn" });
    }
    const { email, password } = requestBody;

    if (!validator.isvalid(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide email" });
    }

    if (!validator.isValidSyntaxOfEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid email" });
    }

    if (!validator.isvalid(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide password" });
    }

    const findEmail = await userModel.findOne({ email });
    if (!findEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "User does'nt exist with this email" });
    }
    const findPassword = await userModel.findOne({ password });
    if (!findPassword) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill correct password" });
    }

    const data = { email, password };
    if (data) {
      let payload = { email: email, password: password };
      const generateToken = jwt.sign(payload, "luezoid");
      res
        .status(200)
        .send({ msg: "Admin login sucessfully", token: generateToken });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, data: err.message });
  }
};

module.exports = { login };
