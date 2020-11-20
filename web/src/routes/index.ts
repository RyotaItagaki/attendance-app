const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IStudentService} from '../Service/IStudentService';
// eslint-disable-next-line new-cap
const router = express.Router();

const con = container.get<IStudentService>(TYPES.IStudentService);

/* Get a home page */
router.get(
    '/attendance',
    async (req: Request, res: Response, next: NextFunction) => {
      const students = await con.findAllStudents();
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

// Get a student
// ここでもviewはindex使えるのでは
router.get(
    '/attendance/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const student = await con.findOneStudent(id);
      // res.json(student);
      res.render('student', {student: student});
    });

// Create a student
router.post(
    '/attendance',
    async (req: Request, res: Response, next: NextFunction) => {
      const name = req.body.name;
      const newStudent = await con.createStudent(name);
      // res.send({message: newStudent});
      res.redirect('/attendance');
    });

module.exports = router;
