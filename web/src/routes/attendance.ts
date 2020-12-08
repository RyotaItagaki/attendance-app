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
// 重要
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
      res.render(
          'attendance',
          {
            group: group,
            members: members,
            dates: dates,
            attendance: attendance,
          });
    });

module.exports = router;
