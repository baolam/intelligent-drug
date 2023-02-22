const express = require("express");
const Router = express.Router();
const schedule = require("node-schedule");

const events = require("../config/event");
const db = require("../config/Database").Database;
const manages = {};

function search(stack)
{
  db.serialize(() => [
    db.get(`SELECT * FROM STACK WHERE stack_id=${stack}`, (err, row) => {
      if (err == null) {
        events.emit("stack_data", row);
      } else {
        consosle.log(err);
        process.exit(0);
      }
    })
  ])
}

Router.get("/", (req, res) => {
  console.log(req.query);
  let { stack, h, m, s, action, name } = req.query;

  /// Convert to true data type
  if (h == undefined) h = 0;
  if (m == undefined) m = 0;
  if (s == undefined) s = 0;

  stack = parseInt(stack);
  let hour = parseInt(h);
  let minute = parseInt(m);
  let second = parseInt(s);

  if (action == undefined)
    action = "create";

  if (action !== "destroy" && action !== "create")
  {
    res.status(200).send("Khong the de trong hanh dong");
    return;
  }

  let act = manages[name];
  if (act == undefined && action == "create")
  {
    // Tien hanh tao su kien moi
    manages[name] = schedule.scheduleJob(name, {
      hour, minute, second
    }, () => {
      // console.log("Thuc thi job");
      search(stack);
    })
    res.status(200).send("Tao job thanh cong");
    return;
  }

  if (act != undefined && action == "create")
  {
    res.status(200).send("Khong the tao job");
    return;
  }

  if (act == undefined && action == "destroy")
  {
    res.status(200).send("Khong the huy job");
    return;
  }

  if (act != undefined && action == "destroy")
  {
    manages[name].cancel();
    manages[name] = undefined;
    res.status(200).send("Huy job thanh cong");
    return;
  }
  
  res.status(200).send("Chua duoc xu li");
});

Router.get("/show", (_req, res) => {
  res.status(200).send("Hien thi tren console");
  console.log(schedule.scheduledJobs);
});

module.exports = Router;