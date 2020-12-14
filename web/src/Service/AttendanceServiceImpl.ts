/* eslint-disable require-jsdoc */

import {injectable} from 'inversify';
import {AttendMapper} from '../mapping/attendance';
import seq from '../mapping/connection';
import {DateMapper} from '../mapping/date';
import {MemberMapper} from '../mapping/member';
import {IAttendanceService, inputAttendance} from './IAttendanceService';

@injectable()
/**
 * AttendanceServiceImpl
 * @implements {IAttendService}
 */
export class AttendanceServiceImpl implements IAttendanceService {
  async findAllAttendance(
      memberIds: number[],
      dateIds: number[],
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const found = await attendanceRepository.findAll({
      where: {
        memberId: memberIds,
        dateId: dateIds,
      },
    }).then((attendance) => {
      return JSON.parse(JSON.stringify(attendance));
    }).catch((e) => {
      throw new Error(e);
    });
    return found;
  }

  // これはid特定で良い
  async findAttendance(
      id: number,
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const memberRepository = seq.getRepository(MemberMapper);
    const dateRepository = seq.getRepository(DateMapper);
    const found = await attendanceRepository.findByPk(
        id,
    ).then((attendance) => {
      return JSON.parse(JSON.stringify(attendance));
    }).catch((e) => {
      throw new Error(e); // todo エラー
    });
    return found;
  }

  async createAttendanceMany(
      input: inputAttendance[],
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const create = await attendanceRepository.bulkCreate(input).then(() => {
      return 'aaaaaaaaaaa';
    }).catch((e) => {
      throw new Error('エラー：' + e);
    });
    return create;
  }

  // id特定
  async updateAttendance(
      id: number,
      attendance: string,
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const update = await attendanceRepository.update(
        {
          attendance: attendance,
        },
        {
          where: {
            id: id,
          },
        },
    ).then(() => {
      return '出席情報を更新しました';
    });
    return update;
  }
}
