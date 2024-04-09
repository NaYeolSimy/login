const express = require("express");
const path = require('path');
//1. sql 연결위해 불러오기
const mysql = require("mysql");
//5. dotenv 불러오기 
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
//6. env 파일 설정하기 
dotenv.config({ path: './.env'});

const app = express();

//2. sql 정보객체 전달하여 연결하기 
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST, // 로컬 호스트인지, ip인지
  user: process.env.DATABASE_USER, // root
  password: process.env.DATABASE_PASSWORD, //비밀번호
  database: process.env.DATABASE // 연결할 스키마
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser()); 

app.set('view engine', 'hbs');

//3. sql의 db와 연결하기
db.connect( (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MYSQL Connected...")
  }
})

/*
4. mysql 들어가서 
users table 만들고 
id.name,email,password colurm 만들어야 함 

*/

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5001, () => {
  console.log("Server started on Port 5001");
})