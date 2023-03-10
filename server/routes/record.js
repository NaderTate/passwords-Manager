const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, response) {
  let db_connect = dbo.getDb();

  try {
    var records = await db_connect.collection("records").find({}).toArray();
    response.json(records);
  } catch (e) {
    console.log("An error occurred pulling the records. " + e);
  }
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  let db_connect = dbo.getDb();
  try {
    let myquery = { _id: new ObjectId(req.params.id) };
    var records = await db_connect
      .collection("records")
      .find(myquery)
      .toArray();
    res.json(records);
  } catch (e) {
    console.log("An error occurred pulling the records. " + e);
  }
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    Site: req.body.Site,
    Email: req.body.Email,
    Username: req.body.Username,
    Password: req.body.Pass,
  };
  const res = db_connect.collection("records").insertOne(myobj);
  response.json(res);
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      Site: req.body.Site,
      Email: req.body.Email,
      Username: req.body.Username,
      Password: req.body.Pass,
    },
  };
  const res = db_connect.collection("records").updateOne(myquery, newvalues);
  response.json(res);
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  const res = db_connect.collection("records").deleteOne(myquery);
  response.json(res);
});

module.exports = recordRoutes;
