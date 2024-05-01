const express = require("express");
const path = require("path");
//1. sql 연결위해 불러오기
const mysql = require("mysql");
//5. dotenv 불러오기
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
//6. env 파일 설정하기
dotenv.config({ path: "./.env" });
const { sequelize } = require("./models");

const app = express();

// 불러온 sequelize의 메소드 sync 이용해 데이터베이스 연결
sequelize
	.sync({ force: false })
	.then(() => {
		console.log("Database synchronized");
	})
	.catch((err) => {
		console.error("Error synchronizing database:", err);
	});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "hbs");

//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5001, () => {
	console.log("Server started on Port 5001");
});
