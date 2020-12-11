/* eslint-disable require-jsdoc */
// 一時的な設定

import {injectable} from 'inversify';
import seq from '../mapping/connection';
import {DateMapper} from '../mapping/date';
import {IDateService} from './IDateService';
// import {IStudentService} from './IStudentService';

@injectable()
/**
 * StudentServiceImpl
 * @implements {IStudentService}
 */
export class DateServiceImpl implements IDateService {
  async findDateInGroup(groupId: number): Promise<string> {
    const dateRepository = seq.getRepository(DateMapper);
    const found = await dateRepository.findAll({
      where: {
        groupId: groupId,
      },
      order: [
        ['date', 'ASC'],
      ],
    }).then((members) => {
      // return JSON.stringify(students);
      return JSON.parse(JSON.stringify(members));
    });
    return found; // todo エラー
  }

  async findDate(id: number): Promise<string> {
    const dateRepository = seq.getRepository(DateMapper);
    const found = await dateRepository.findByPk(id).then((date) => {
      // return JSON.parse(JSON.stringify(date));
      return JSON.stringify(date);
    }).catch((e) => {
      throw new Error(e); // todo エラー
    });
    return found;
  }

  // 日付被りしない仕様
  async createDate(
      groupId: number,
      date: Date,
      otherInfo: string,
  ): Promise<string> {
    const dateRepository = seq.getRepository(DateMapper);
    const create = await dateRepository.create({
      // idは自動採番
      groupId: groupId,
      date: date,
      otherInfo: otherInfo,
    }).then(() => {
      return '新規date作成';
    }).catch((e) => {
      throw new Error('えらー' + e);
    });
    return create;
  }

  async createDate2(
      groupId: number,
      date: Date,
      otherInfo: string,
  ): Promise<{ id: number; message: string; }> {
    const dateRepository = seq.getRepository(DateMapper);
    const create = await dateRepository.create({
      // idは自動採番
      groupId: groupId,
      date: date,
      otherInfo: otherInfo,
    }).then((date) => {
      const id = date.id;
      const message = '新規date作成';
      return {id: id, message: message};
    }).catch((e) => {
      throw new Error('えらー' + e);
    });
    return create;
  }

  async updateDate(
      id: number,
      date: Date,
      otherInfo: string,
  ): Promise<string> {
    const dateRepository = seq.getRepository(DateMapper);
    const update = await dateRepository.update(
        {
          date: date,
          otherInfo: otherInfo,
        },
        {
          where: {id: id},
        },
    ).then(() => {
      return 'date修正';
    });
    return update;
  }

  async deleteDate(id: number): Promise<string> {
    const dateRepository = seq.getRepository(DateMapper);
    const del = await dateRepository.destroy({
      where: {id: id},
    }).then(() => {
      return 'date削除';
    });
    return del;
  }
}
