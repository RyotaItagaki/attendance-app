/* eslint-disable no-undef */
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
      res.status(200).render('index', {students: students});
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
      res.status(201).redirect('/attendance');
    });

// update a student
// router.putじゃねーの？？？？？？
router.post(
    '/attendance/:id/edit',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const name = req.body.name;
      const updateStudent = await con.updateStudent(id, name);
      res.status(201).redirect('/attendance');
    });

// delete a student
// /*
router.post(
    '/attendance/:id/del',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      /*
      if (condition) {

      } else {

      }
      */
      const deleteStudent = await con.deleteStudent(id);
      // res.redirect('/attendance');
      res.status(200).redirect('/attendance');
    });
// */

module.exports = router;
