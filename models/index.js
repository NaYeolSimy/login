'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

// sequelize와 db 연결 (db 정보는 config 파일에 정의됨)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

// sequelize엔  db정보가 담긴 Sequelize 객체가 들어가있다
// 환경에 따라 연결정보를 변경하기 위해 config 객체에 직접 연결 하지 않고
// config 파일을 불러와 연결

// db 객체에 model 설정

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize, // Sequelize 객체와 DataTypes 객체를 사용하여 해당 모델을 초기화
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

// db 객체의 model들 간 관계 설정

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 데이터베이스와 모델들이 연결된 Sequelize 클래스가 들어있는 sequelize 인스턴스를 db 객체에 할당
db.sequelize = sequelize;
// 불러온 Sequelize 모듈 자체를 db 객체에 할당
// model 정의할때 Sequelize를 import 하지않고
// Sequelize 모듈이 제공하는 다양한 함수 사용가능
db.Sequelize = Sequelize;

module.exports = db;
