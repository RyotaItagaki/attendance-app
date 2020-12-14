/* eslint-disable require-jsdoc */
// 一時的な設定

import {injectable} from 'inversify';
import seq from '../mapping/connection';
import {GroupMapper} from '../mapping/group';
import {IGroupService} from './IGroupService';

@injectable()
/**
 * GroupServiceImpl
 * @implements {IGroupService}
 */
export class GroupServiceImpl implements IGroupService {
  async findAllGroup(): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const found = await groupRepository.findAll({
      order: [
        ['id', 'ASC'],
      ],
    }).then((groups) => {
      return JSON.parse(JSON.stringify(groups));
    });
    return found; // todo エラー
  }

  async findGroup(id: number): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const found = await groupRepository.findByPk(id).then((group) => {
      return JSON.parse(JSON.stringify(group));
    }).catch((e) => {
      throw new Error(e); // todo エラー
    });
    return found;
  }

  async createGroup(name: string, explain: string): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const create = await groupRepository.create({
      // idの自動採番
      groupName: name, // 注意
      explain: explain,
    }).then(() => {
      return '新規グループを作成しました';
    });
    return create;
  }

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
      return 'グループを修正しました';
    });
    return update;
  }

  async deleteGroup(id: number): Promise<string> {
    const groupRepository = seq.getRepository(GroupMapper);
    const del = await groupRepository.destroy({
      where: {id: id},
    }).then(() => {
      return 'グループを削除しました';
    });
    return del;
  }
}
