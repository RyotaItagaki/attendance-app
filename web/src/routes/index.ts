const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IStudentService} from '../Service/IStudentService';
// eslint-disable-next-line new-cap
const router = express.Router();

const con = container.get<IStudentService>(TYPES.IStudentService);

/* Get a home page */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const students = await con.findAll();
  // const student1 = students
  // res.json(students);
  // res.render('index', {students: students});
  // res.render('index', {name: 'Ryota'});
  /*
  res.render('index', {
    students: [
      {id: 1, name: '亮太'},
      {id: 2, name: 'だいし'},
    ],
  });
  */
  res.render('index', {students: students});
  // res.send('トップページ');
  // res.json({message: 'hello, world'});
});

module.exports = router;
