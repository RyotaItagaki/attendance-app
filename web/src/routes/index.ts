/* eslint-disable no-undef */
const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IGroupService} from '../Service/IGroupService';
import {IStudentService} from '../Service/IStudentService';
// eslint-disable-next-line new-cap
const router = express.Router();

// const con = container.get<IStudentService>(TYPES.IStudentService);
const con = container.get<IGroupService>(TYPES.IGroupService);

// テスト
// 後々消す
router.get(
    '/message',
    async (req: Request, res: Response, next: NextFunction) => {
      const message = 'メッセージ';
      res.status(200).render('message', {message: message});
    });

// Get all groups
router.get(
    '/home',
    async (req: Request, res: Response, next: NextFunction) => {
      const groups = await con.findAllGroup();
      res.status(200).render('index', {groups: groups});
    });

// Get a group
router.get(
    '/home/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const group = await con.findGroup(id);
      // res.json(student);
      res.render('group', {group: group});
    });

// Create a group
router.post(
    '/home',
    async (req: Request, res: Response, next: NextFunction) => {
      const name = req.body.name;
      const explain = req.body.explain;
      const newGroup = await con.createGroup(name, explain);
      // res.send({message: newStudent});
      // res.status(201).redirect('/attendance');
      res.status(201).render('message', {message: newGroup});
    });

// update a group
// router.putじゃねーの？？？？？？
router.post(
    '/home/:id/edit',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const name = req.body.name;
      const explain = req.body.explain;
      const updateGroup = await con.updateGroup(id, name, explain);
      // res.status(201).redirect('/attendance');
      res.status(200).render('message', {message: updateGroup});
    });

// delete a student
router.post(
    '/home/:id/del',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const deleteGroup = await con.deleteGroup(id);
      res.status(204).redirect('/home');
      // res.status(204).json({message: deleteGroup});
    });

// */

module.exports = router;
