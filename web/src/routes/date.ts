const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IAttendanceService} from '../Service/IAttendanceService';
import {IDateService} from '../Service/IDateService';
import {IMemberService} from '../Service/IMemberService';

// eslint-disable-next-line new-cap
const router = express.Router();

const con = container.get<IDateService>(TYPES.IDateService);
const conMember = container.get<IMemberService>(TYPES.IMemberService);
// eslint-disable-next-line max-len
const conAttendance = container.get<IAttendanceService>(TYPES.IAttendanceService);

// get a date
router.get(
    '/:groupId/date/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const date = JSON.parse(await con.findDate(id));
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
      const preDate = await con.findDate(id).then((date) => {
        const dateObj = new Date(JSON.parse(date).date);
        const yyyy = dateObj.getFullYear();
        const mm = ('0' + (dateObj.getMonth()+1)).slice(-2);
        const dd = ('0' + dateObj.getDate()).slice(-2);
        const dateStr = `${yyyy}-${mm}-${dd}`;
        const otherInfo = JSON.parse(date).otherInfo;
        return {date: dateStr, otherInfo: otherInfo};
      });
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
      const newDate = await con.createDate2(
          groupId,
          date,
          otherInfo,
      );
      const member = await conMember.findMemberInGroup(groupId);
      // eslint-disable-next-line max-len
      const inputAttendance = JSON.parse(JSON.stringify(member)).map((member) => {
        return {memberId: member.id, dateId: newDate.id, attendance: 'unknown'};
      });
      // eslint-disable-next-line max-len
      const newAttendance = await conAttendance.createAttendanceMany(inputAttendance);
      res.status(201).render(
          'messageMember',
          {
            groupId: groupId,
            message: newDate.message + newAttendance,
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
