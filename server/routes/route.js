const path = require("path");

/**
 * 
 * @param {*} app
 * @description
 * Đường dẫn của server 
 */
function route(app)
{
  app.use("/information", require("./information"));
  app.use("/schedule", require("./schedule"));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "build", "index.html"));
  });
}

module.exports = route;