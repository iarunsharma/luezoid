const websiteModel = require("../models/websiteModel");
const articleModel = require("../models/articleModel");
const validator = require("../middlewares/validator");
const subscriptionModel = require("../models/subscriptionModel");
const nodemailer = require("nodemailer");

//----------------------------------------------------------------------------------------------------------------------//

const website = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, messgae: "provide some data to proceed" });
    }
    if (!validator.isvalid(requestBody.name)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide name" });
    }

    const data = await websiteModel.create(requestBody);
    return res.status(201).send({
      status: true,
      messgae: "Website Created sucessfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).send({ status: false, messgae: err.messgae });
  }
};

//-------------------------------------------------------------------------------------------------------------------//

const article = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, messgae: "provide some data to proceed" });
    }
    const { title, description, body, websiteId } = requestBody;
    if (!validator.isvalid(title)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide title" });
    }
    if (!validator.isvalid(description)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide description" });
    }
    if (!validator.isvalid(body)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide body" });
    }
    if (!validator.isvalid(websiteId)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide WebsiteId" });
    }
    if (!validator.isValidObjectId(websiteId)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide valid WebsiteId" });
    }

    const data = await articleModel.create(requestBody);
    return res.status(201).send({
      status: true,
      messgae: "Website Created sucessfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).send({ status: false, messgae: err.messgae });
  }
};

//-------------------------------------------------------------------------------------------------------------//

const subscription = async function (req, res) {
  try {
    requestBody = req.body;
    if (!validator.isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, messgae: "provide some data to proceed" });
    }
    const { email, websiteId } = requestBody;

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

    if (!validator.isvalid(websiteId)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide WebsiteId" });
    }
    if (!validator.isValidObjectId(websiteId)) {
      return res
        .status(400)
        .send({ status: false, messgae: "Please provide valid WebsiteId" });
    }
    const createSubscription = await subscriptionModel.create(requestBody);
    return res.status(201).send({
      satus: true,
      messgae: "subscribed successfully",
      data: createSubscription,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, messgae: err.messgae });
  }
};

//---------------------------------------------------------------------------------------------------------------------//

const getEmail = async function (req, res) {
  try {
    const sub = await subscriptionModel.find().select({ email: 1, _id: 0 });
    return res.status(200).send({ data: sub });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, messgae: err.messgae });
  }
};

//-----------------------------------------------------------------------------------------------------------------------//

const sendEmail = async function (req, res) {
  try {
      const requestBody = req.body.email

      // let { email} = requestBody; 
      let Transporter = nodemailer.createTransport({
          // Host: "smtp.ethereal.email",
          // Port: 587,
          // Secure: false,
          service: "gmail",
          auth: {
            user: "<your email>",
            pass: "<your password>",
          },
        });
      
      //   let info = await Transporter.sendMail({
        let info = {
          from: '"panditarun043@gmail.com', 
          to: requestBody, 
          subject: "Hi ✔", 
          text: "Hi?", 
          html: "<b>Hi?</b>", 
        };

        Transporter.sendMail(info, (err, data) => {
          if (err) {
              return console.log(err);
          }
          return console.log("Email send");
      });
      return res.send("abc.");
  }catch(err){
    console.log(err);
    return res.status(500).send({ status: false, messgae: err.messgae });
  }
};

  
// const sendEmail = async function (req, res) {
//   try {
//       const requestBody = req.body

//       let { Email} = requestBody; 
//       let Transporter = nodemailer.createTransport({
//           Host: "smtp.ethereal.email",
//           Port: 587,
//           Secure: false,
//           Auth: {
//             user: 'kieran.balistreri69@ethereal.email',
//             pass: 'SR36vDv5qxs2sJ7A1T'
//           },
//         });
      
       
//         let info = await Transporter.sendMail({
//           from: '"Zomato" <website@example.com>', 
//           to: `${Email}`, 
//           subject: "Hi ✔", 
//           text: "Hi?", 
//           html: "<b>Hi?</b>", 
//         });
      
//         console.log("Message sent: %s", info.messageId);
       
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//         res.send('Email sent!')
//   }
//   catch (err) {
//     console.log(err)
//       res.status(500).send({ status: false, message: err.message })
//   }
// }

module.exports = { website, article, subscription, getEmail, sendEmail };
