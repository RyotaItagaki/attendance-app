/* eslint-disable no-undef */
const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IGroupService} from '../Service/IGroupService';
// eslint-disable-next-line new-cap
const router = express.Router();

const con = container.get<IGroupService>(TYPES.IGroupService);

/* https://localhost:3000/group からの続き */

// Get all groups
router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      const groups = await con.findAllGroup();
      res.status(200).render('index', {groups: groups});
    });

// Get a group and members in group
router.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const group = await con.findGroup(id);
      res.render('group', {group: group});
    });

// Create a group
router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      const name = req.body.name;
      const explain = req.body.explain;
      const newGroup = await con.createGroup(name, explain);
      res.status(201).render('messageGroup', {message: newGroup});
    });

// update a group
router.post(
    '/:id/edit',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const name = req.body.name;
      const explain = req.body.explain;
      const updateGroup = await con.updateGroup(id, name, explain);
      res.status(200).render('messageGroup', {message: updateGroup});
    });

// delete a group
// TODO 削除後の処理
router.post(
    '/:id/del',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const deleteGroup = await con.deleteGroup(id);
      res.status(204).redirect('/group');
    });

module.exports = router;
