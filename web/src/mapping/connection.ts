import {Model, Sequelize} from 'sequelize-typescript';
import {AttendMapper} from './attendance';
import {DateMapper} from './date';
import {GroupMapper} from './group';
import {MemberMapper} from './member';

const env = process.env.NODE_ENV || 'development';
// const env = 'development';
const dbconf = require('../config/config.json')[env];

const seq = new Sequelize({
  host: dbconf['host'],
  database: dbconf['database'],
  dialect: dbconf['dialect'],
  username: dbconf['username'],
  password: dbconf['password'],
  storage: ':memory:',
  repositoryMode: true,
  // models: [__dirname + './'],
});

seq.addModels([GroupMapper, MemberMapper, DateMapper, AttendMapper]);

export default seq;
