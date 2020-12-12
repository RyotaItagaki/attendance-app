/* eslint-disable require-jsdoc */

import {injectable} from 'inversify';
import {AttendMapper} from '../mapping/attendance';
import seq from '../mapping/connection';
import {MemberMapper} from '../mapping/member';
import {IMemberService} from './IMemberService';

@injectable()
/**
 * StudentServiceImpl
 * @implements {IStudentService}
 */
export class MemberServiceImpl implements IMemberService {
  async findMemberInGroup(groupId: number): Promise<string> {
    const memberRepository = seq.getRepository(MemberMapper);
    const found = await memberRepository.findAll({
      where: {
        groupId: groupId,
      },
      order: [
        ['number', 'ASC'],
      ],
    }).then((members) => {
      return JSON.parse(JSON.stringify(members));
    }).catch((e) => {
      throw new Error('エラー：' + e);
    });
    return found; // todo エラー
  }

  async findMember(id: number): Promise<string> {
    const memberRepository = seq.getRepository(MemberMapper);
    const found = await memberRepository.findByPk(id).then((member) => {
      return JSON.parse(JSON.stringify(member));
    }).catch((e) => {
      throw new Error(e); // todo エラー
    });
    return found;
  }

  async createMember(
      groupId: number,
      number: number,
      name: string,
      sex: string,
      otherInfo: string,
  ): Promise<{ id: number; message: string; }> {
    const memberRepository = seq.getRepository(MemberMapper);
    const create = await memberRepository.create({
      // idは自動採番
      groupId: groupId,
      number: number,
      name: name,
      sex: sex,
      otherInfo: otherInfo,
    }).then((member) => {
      const id = member.id;
      const message = '新規member作成';
      return {id: id, message: message};
    }).catch((e) => {
      throw new Error('えらー' + e);
    });
    return create;
  }

  async updateMember(
      id: number,
      number: number,
      name: string,
      sex: string,
      otherInfo: string,
  ): Promise<string> {
    const memberRepository = seq.getRepository(MemberMapper);
    const update = await memberRepository.update(
        {
          number: number,
          name: name,
          sex: sex,
          otherInfo: otherInfo,
        },
        {
          where: {id: id},
        },
    ).then(() => {
      return 'member修正';
    });
    return update;
  }

  async deleteMember(id: number): Promise<string> {
    const memberRepository = seq.getRepository(MemberMapper);
    const del = await memberRepository.destroy({
      where: {id: id},
    }).then(() => {
      return 'member削除';
    });
    return del;
  }
}
