const sqlite3 = require("sqlite3");
const path = require("path");
const events = require("../config/event");

/// Khởi tạo database và kết nối
const Database = new sqlite3.Database(path.join(__dirname, "stack-database.db"), (err) => {
  if (err == null)
  {
    console.log("Kết nối tới database thành công");
  } else {
    console.log(err);
    process.exit(0);
  }
});

function sadd(stack_id, phone, drug, folder)
{
  Database.serialize(() => {
    let query = `INSERT INTO STACK (stack_id, phone, drink, folder) VALUES (${stack_id}, ${phone}, ${drug}, ${folder})`;
    Database.run(query, 
    ((err) => {
      if (err == null) console.log("Thêm dữ liệu thành công");
      else {
        console.log(err);
        process.exit(0);
      }
    }));
  });
}

function supdate(stack_id, phone, drug)
{
  Database.serialize(() => {
    Database.run(`UPDATE STACK SET stack_id=${stack_id},phone=${phone},drink=${drug} WHERE stack_id=${stack_id}`,
    ((err) => {
      if (err == null) console.log("Cập nhật dữ liệu thành công");
      else {
        console.log(err);
        process.exit(0);
      }
    }));
  })
}

function ssearch(drink)
{
  Database.serialize(() => {
    Database.get(`SELECT * FROM STACK WHERE drink=${drink}`,
    (err, res) => {
      if (err == null) {
        events.emit("stack_data", res);
      } else {
        consosle.log(err);
        process.exit(0);
      }
    });
  })
}

module.exports = {
  Database,
  stack : {
    add : sadd,
    update : supdate,
    search : ssearch
  }
}