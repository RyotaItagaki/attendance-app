const express = require('express');
import {Request, Response, NextFunction} from 'express';
import {container} from '../common/inversify.config';
import {TYPES} from '../common/Types';
import {IGroupService} from '../Service/IGroupService';
import {IMemberService} from '../Service/IMemberService';
// eslint-disable-next-line new-cap
const router = express.Router();

const conGroup = container.get<IGroupService>(TYPES.IGroupService);
const con = container.get<IMemberService>(TYPES.IMemberService);

/* https://localhost:3000/group からの続き */

// get all members in group
// 重要
// 後に移植するかも
router.get(
    '/:groupId/attendance',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const group = await conGroup.findGroup(groupId);
      const members = await con.findMemberInGroup(groupId);
      res.render('attendance', {group: group, members: members});
    });

// get a member
router.get(
    '/:groupId/member/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const member = await con.findMember(id);
      const groupId = parseInt(req.params.groupId);
      res.render('member', {groupId: groupId, id: id, member: member});
    });

// get a create page
router.get(
    '/:groupId/member',
    (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      res.render('createMember', {groupId: groupId});
    } );

// get a update page
router.get(
    '/:groupId/member/:id/edit',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const id = parseInt(req.params.id);
      const preMember = await con.findMember(id);
      // formのinputに初期値入れる
      res.render(
          'updateMember',
          {
            groupId: groupId,
            id: id,
            preMember: preMember,
          });
    });

// create a member
router.post(
    '/:groupId/member',
    async (req: Request, res: Response, next: NextFunction) => {
      const groupId = parseInt(req.params.groupId);
      const number = req.body.number;
      const name = req.body.name;
      const sex = req.body.sex;
      const otherInfo = req.body.otherInfo;
      const newMember = await con.createMember(
          groupId,
          number,
          name,
          sex,
          otherInfo,
      );
      res.status(201).render('message', {message: newMember});
    });

// update a member
// router.putでいける？
router.post(
    '/:groupId/member/:id/edit',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const number = req.body.number;
      const name = req.body.name;
      const sex = req.body.sex;
      const otherInfo = req.body.otherInfo;
      const updateMember = await con.updateMember(
          id,
          number,
          name,
          sex,
          otherInfo,
      );
      res.status(200).render('message', {message: updateMember});
    });

// delete a member
router.post(
    '/:groupId/member/:id/del',
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const deleteMember = await con.deleteMember(id);
      res.redirect('/group');
    });

module.exports = router;
