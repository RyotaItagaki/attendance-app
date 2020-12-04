const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IDateService} from '../Service/IDateService';

// eslint-disable-next-line new-cap
const router = express.Router();

const con = container.get<IDateService>(TYPES.IDateService);

// get a date
router.get(
    '/:groupId/date/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const date = await con.findDate(id);
      res.render('date', {groupId: groupId, id: id, date: date});
    });

// get a create page
router.get(
    '/:groupId/date',
    (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      res.render('createDate', {groupId: groupId});
    });

// get a update page
router.get(
    '/:groupId/date/:id/edit',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const preDate = await con.findDate(id);
      res.render(
          'updateDate', {
            groupId: groupId,
            id: id,
            preDate: preDate,
          });
    });

// create a date
router.post(
    '/:groupId/date',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const date = req.body.date;
      const otherInfo = req.body.otherInfo;
      const newDate = await con.createDate(
          groupId,
          date,
          otherInfo,
      );
      res.status(201).render(
          'messageMember',
          {
            groupId: groupId,
            message: newDate,
          });
    });

// update a date
router.post(
    '/:groupId/date/:id/edit',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const date = req.body.date;
      const otherInfo = req.body.otherInfo;
      const updateDate = await con.updateDate(
          id,
          date,
          otherInfo,
      );
      res.status(200).render(
          'messageMember',
          {
            groupId: groupId,
            message: updateDate,
          });
    });

// delete a date
router.post(
    '/:groupId/date/:id/del',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const delDate = await con.deleteDate(id);
      console.log(delDate);
      res.status(202).render(
          'messageMember',
          {
            groupId: groupId,
            message: delDate,
          });
    });

module.exports = router;
