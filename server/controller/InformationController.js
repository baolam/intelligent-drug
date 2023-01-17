const fs = require("fs");
const path = require("path");
const b64toimage = require("base64-to-image");
const Database = require("../config/Database").Database;
const stack = require("../config/Database").stack;

const events = require("../config/event");

class InformationController {
  static PATH_IMAGE = path.join(__dirname, "../", "images");

  static get(__req, res)
  {
    Database.serialize(() => {
      Database.all("SELECT * FROM STACK", ((err, rows) => {
        if (err == null)
        {
          res.status(200).send(rows);
        } else {
          console.log(err);
          res.status(200).send([]);
          process.exit(0);
        }
      }));
    });
  }

  static update(req, res)
  {
    let body = req.body;
    let information = JSON.parse(body["private-information"]);
    let images = [];
    for (let i = 0; i < information.n; i++)
      images.push(body[`image-${i + 1}`]);
    /// Xem xét dữ liệu hiển thị
    let { stack_id, drink, phone } = information;

    /// Xóa đi tất cả các file ảnh tồn tại trong folder
    /// Lưu file mới
    let target_folder = path.join(__dirname, "../", "images", String(stack_id)) + "/";
    let file_image = images.map((__, idx) => String(idx + 1));
    for (let i = 0; i < information.n; i++)
      b64toimage(images[i], target_folder, { 'fileName' : file_image[i], 'type' : "png", 'debug' : true });
    /// Cập nhật cơ sở dữ liệu
    stack.update(stack_id, phone, drink);
    
    /// Gửi dữ liệu đến raspberry pi
    events.emit("update_stack", { stack_id, phone });

    /// Gửi phản hồi đến người dùng
    res.status(200).send("OK");
  }

  static create(req, res)
  {
    let { stack_id, phone, drug } = req.query;
    let folder = String(stack_id);
    let my_folder = path.join(this.PATH_IMAGE, folder);
    
    /// Thêm dữ liệu
    stack.add(parseInt(stack_id), phone, parseInt(drug), folder);
    
    /// Tạo folder
    /// https://stackoverflow.com/questions/21194934/how-to-create-a-directory-if-it-doesnt-exist-using-node-js
    if (! fs.existsSync(my_folder))
    {
      fs.mkdirSync(my_folder, { recursive : true });
    }

    res.status(200).send("OK");
  }
}

module.exports = InformationController;