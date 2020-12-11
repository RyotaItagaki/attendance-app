/* eslint-disable require-jsdoc */
// 一時的な設定

import {injectable} from 'inversify';
import {AttendMapper} from '../mapping/attendance';
import seq from '../mapping/connection';
import {DateMapper} from '../mapping/date';
import {MemberMapper} from '../mapping/member';
import {IAttendanceService, inputAttendance} from './IAttendanceService';
// import {IStudentService} from './IStudentService';

@injectable()
/**
 * StudentServiceImpl
 * @implements {IStudentService}
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
      // memberId: number,
      // dateId: number,
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const memberRepository = seq.getRepository(MemberMapper);
    const dateRepository = seq.getRepository(DateMapper);
    const found = await attendanceRepository.findByPk(
        id,
    ).then((attendance) => {
      // return attendance;
      // return JSON.stringify(attendance);
      return JSON.parse(JSON.stringify(attendance));
    }).catch((e) => {
      throw new Error(e); // todo エラー
    });
    return found;
  }

  async createAttendance(
      memberId: number,
      dateId: number,
      attendance: string,
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const create = await attendanceRepository.create({
      // idは自動採番
      memberId: memberId,
      dateId: dateId,
      attendance: attendance,
    }).then(() => {
      return '新規attendance作成';
    }).catch((e) => {
      throw new Error('えらー' + e);
    });
    return create;
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
      return 'attendance修正';
    });
    return update;
  }

  async updateAttendanceMany(
      memberId: number,
      dateId: number,
      attendance: string,
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const update = await attendanceRepository.update(
        {
          attendance: attendance,
        },
        {
          where: {
            memberId: memberId,
            dateId: dateId,
          },
        },
    ).then(() => {
      return 'attendance修正';
    });
    return update;
  }

  /*
  async deleteAttendance(
      memberId: number,
      dateId: number,
  ): Promise<string> {
    const attendanceRepository = seq.getRepository(AttendMapper);
    const del = await attendanceRepository.destroy({
      where: {
        memberId: memberId,
        dateId: dateId,
      },
    }).then(() => {
      return 'attendance削除';
    });
    return del;
  }
  // */
}
