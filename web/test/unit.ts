/* eslint-disable no-undef */
import 'mocha';
import {container} from '../src/common/inversify.config';
import {TYPES} from '../src/common/Types';
import {assert} from 'chai';
import {IAttendanceService} from '../src/Service/IAttendanceService';
// const assert = require('chai');

describe('テスト', () => {
  it('attendance取得', async () => {
    const con = container.get<IAttendanceService>(TYPES.IAttendanceService);
    const find = await con.findAttendance(1, 1);
    assert.equal('新規student作成', find);
  });
});
