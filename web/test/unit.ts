import 'mocha';
import {container} from '../src/common/inversify.config';
import {TYPES} from '../src/common/Types';
import {IStudentService} from '../src/Service/IStudentService';
import {assert} from 'chai';
// const assert = require('chai');

describe('テスト', () => {
  it('student作成', async () => {
    const con = container.get<IStudentService>(TYPES.IStudentService);
    const create = await con.createOneStudent('中村真太郎');
    assert.equal('新規student作成', create);
  });
});
