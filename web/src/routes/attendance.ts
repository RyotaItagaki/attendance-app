const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {json} from 'sequelize/types';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IAttendanceService} from '../Service/IAttendanceService';
import {IDateService} from '../Service/IDateService';
import {IGroupService} from '../Service/IGroupService';
import {IMemberService} from '../Service/IMemberService';
// eslint-disable-next-line new-cap
const router = express.Router();

const conGroup = container.get<IGroupService>(TYPES.IGroupService);
const conMember = container.get<IMemberService>(TYPES.IMemberService);
const conDate = container.get<IDateService>(TYPES.IDateService);
// eslint-disable-next-line max-len
const conAttendance = container.get<IAttendanceService>(TYPES.IAttendanceService);

/* https://localhost:3000/group からの続き */

// get all members, dates, attendances
router.get(
    '/:groupId/attendance',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const group = await conGroup.findGroup(groupId);
      const members = await conMember.findMemberInGroup(groupId);
      const dates = await conDate.findDateInGroup(groupId);
      const memberIds = JSON.parse(JSON.stringify(members)).map((member) => {
        return member.id;
      });
      const dateIds = JSON.parse(JSON.stringify(dates)).map((date) => {
        return date.id;
      });
      const attendance = await conAttendance.findAllAttendance(
          memberIds,
          dateIds,
      );
      res.status(200).render(
          'attendance',
          {
            group: group,
            members: members,
            dates: dates,
            attendance: attendance,
          });
    });

// get a update page
// いらんかも
// てか違うかも
router.get(
    '/:groupId/attendance/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const attendance = await conAttendance.findAttendance(id);
      const attendanceArr = JSON.parse(JSON.stringify(attendance));
      const member = await conMember.findMember(attendanceArr.memberId);
      const memberArr = JSON.parse(JSON.stringify(member));
      const date = await conDate.findDate(attendanceArr.dateId);
      const dateArr = JSON.parse(date);
      // const member = await conMember.findMember
      /*
      const dateId = parseInt(req.params.dateId);
      const date = await conDate.findDate(dateId);
      const DATE = JSON.parse(JSON.stringify(date));
      const members = await conMember.findMemberInGroup(groupId);
      const memberIds = JSON.parse(JSON.stringify(members)).map((member) => {
        return member.id;
      });
      const attendance = await conAttendance.findAllAttendance(
          memberIds,
          [dateId],
      );
      // */
      /*
      res.json({
        membernName: memberArr.name,
        date: dateArr,
        attendance: attendanceArr,
      });
      */
      // /*
      res.status(200).render(
          'editAttendance',
          {
            groupId: groupId,
            member: memberArr.name,
            date: dateArr.date,
            attendance: attendanceArr,
          },
      );
      // */
    });

// update an attendance
router.post(
    '/:groupId/attendance/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const attendance = req.body.attendance;
      const newAttendance = await conAttendance.updateAttendance(
          id,
          attendance,
      );
      res.status(200).render(
          'messageMember',
          {
            groupId: groupId,
            message: newAttendance,
          });
    });

module.exports = router;
