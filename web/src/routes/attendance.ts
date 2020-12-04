const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IDateService} from '../Service/IDateService';
import {IGroupService} from '../Service/IGroupService';
import {IMemberService} from '../Service/IMemberService';
// eslint-disable-next-line new-cap
const router = express.Router();

const conGroup = container.get<IGroupService>(TYPES.IGroupService);
const conMember = container.get<IMemberService>(TYPES.IMemberService);
const conDate = container.get<IDateService>(TYPES.IDateService);

/* https://localhost:3000/group からの続き */

// get all members, dates, attendances
// 重要
// 後に移植するかも
router.get(
    '/:groupId/attendance',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const group = await conGroup.findGroup(groupId);
      const members = await conMember.findMemberInGroup(groupId);
      const dates = await conDate.findDateInGroup(groupId);
      res.render(
          'attendance',
          {
            group: group,
            members: members,
            dates: dates,
          });
    });

module.exports = router;
