/* eslint-disable no-undef */
import 'mocha';
import {container} from '../src/common/inversify.config';
import {TYPES} from '../src/common/Types';
import {IStudentService} from '../src/Service/IStudentService';
import {assert} from 'chai';
// const assert = require('chai');

describe('テスト', () => {
  it('student作成', async () => {
    const con = container.get<IStudentService>(TYPES.IStudentService);
    const create = await con.createStudent('中村真太郎');
    assert.equal('新規student作成', create);
  });

  it('student修正', async () => {
    const con = container.get<IStudentService>(TYPES.IStudentService);
    const update = await con.updateStudent(2, '工藤大嗣');
    assert.equal('student修正', update);
  });

  it('student削除', async () => {
    const con = container.get<IStudentService>(TYPES.IStudentService);
    const del = await con.deleteStudent(8);
    assert.equal('student削除', del);
  });
});
