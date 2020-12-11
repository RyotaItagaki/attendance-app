/* eslint-disable no-undef */
import 'mocha';
import {container} from '../src/common/inversify.config';
import {TYPES} from '../src/common/Types';
import {assert} from 'chai';
import {IAttendanceService} from '../src/Service/IAttendanceService';
import {IMemberService} from '../src/Service/IMemberService';
// const assert = require('chai');

describe('テスト', () => {
  it('attendance取得', async () => {
    const con = container.get<IAttendanceService>(TYPES.IAttendanceService);
    const attendance = await con.findAttendance(1);
    const attendanceArr = JSON.parse(JSON.stringify(attendance));
    const memberId = attendanceArr.memberId;
    assert.equal(1, memberId);
  });

  it('member作成', async () => {
    const con = container.get<IMemberService>(TYPES.IMemberService);
    const create = await con.createMember2(
        1,
        3,
        '藤田優一',
        'man',
        'ポジです。',
    );
    assert.equal(3, create.id);
  });
});
