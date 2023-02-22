const path = require("path");
const express = require("express");
const http = require("http");
const ip = require("ip");
const socketio = require("socket.io");
const morgan = require("morgan");
const nschedule = require("node-schedule");

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors : { origin : "*" },
  allowEIO3 : true
});

const { config } = require("dotenv");

/// Config các biến môi trường
config({ path : path.join(__dirname, "server", "config", ".env") });

const PORT = process.env.PORT || 4000;
const SERVER_ADDRESS = `http://${ip.address()}:${PORT}`;

/// Các middleware
const cors = require("cors");
app.use(cors({ origin : "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, "server", "build")));
app.use(morgan("dev"));

const route = require("./server/routes/route");

// Socket.io
// Nhận dữ liệu và truyền dữ liệu
io.on("connection", (_socket) => {

});

/// Khởi tạo dịch vụ lắng nghe thời gian
const stack = require("./server/config/Database").stack;
const event = require("./server/config/event");
/// ----------------------------------------------------
const schedule_rule = new nschedule.RecurrenceRule();
schedule_rule.hour = [new nschedule.Range(6, 20, 1)];
schedule_rule.minute = 0;

/// Lắng nghe dữ liệu phản hồi
event.addListener("stack_data", (data) => {
  console.log("Du lieu hien thi", data);
  if (data != undefined)
  {
    // console.log("Kết quả phản hồi ", data);
    io.emit("stack_data", data);
  }
});

/// Lắng nghe cập nhật kết quả
event.addListener("update_stack", (data) => {
  io.emit("update_stack", data);
});

/// Tạo sự kiện chạy vào từng giờ chuẩn
nschedule.scheduleJob("Stack hour", schedule_rule, (fire) => {
  let hour = fire.getHours();
  console.log(`Đang thực thi tại lúc ${hour} giờ`);
  stack.search(hour);
});

route(app);

server.listen(PORT, (() => {
  console.log(`Server is running at ${SERVER_ADDRESS}`);
}));