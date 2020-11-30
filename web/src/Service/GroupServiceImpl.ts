/* eslint-disable require-jsdoc */
// 一時的な設定

import {injectable} from 'inversify';
import seq from '../mapping/connection';
import {GroupMapper} from '../mapping/group';
import {StudentsMapper} from '../mapping/students';
import {IGroupService} from './IGroupService';
// import {IStudentService} from './IStudentService';

@injectable()
/**
 * StudentServiceImpl
 * @implements {IStudentService}
 */
export class GroupServiceImpl implements IGroupService {
  async findAllGroup(): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const found = await groupRepository.findAll({
      order: [
        ['id', 'ASC'],
      ],
    }).then((groups) => {
      // return JSON.stringify(students);
      return JSON.parse(JSON.stringify(groups));
    });
    return found; // todo エラー
  }

  async findGroup(id: number): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const found = await groupRepository.findByPk(id).then((group) => {
      return JSON.parse(JSON.stringify(group));
      // return student;
    }).catch((e) => {
      throw new Error(e); // todo エラー
    });
    return found;
  }

  // ゆくゆくはjson入力？？？
  // routesでreq.body.nameでいけるはず
  // /*
  async createGroup(name: string, explain: string): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const create = await groupRepository.create({
      // idの自動採番
      groupName: name, // 注意
      explain: explain,
    }).then(() => {
      return '新規group作成';
    });
    return create;
  }
  // */

  async updateGroup(
      id: number, name: string, explain: string,
  ): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const update = await groupRepository.update(
        {
          groupName: name, // 注意
          explain: explain,
        },
        {
          where: {id: id},
        },
    ).then(() => {
      return 'group修正';
    });
    return update;
  }

  async deleteGroup(id: number): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const del = await groupRepository.destroy({
      where: {id: id},
    }).then(() => {
      return 'group削除';
    });
    return del;
  }
}
