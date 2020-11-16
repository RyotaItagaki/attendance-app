/* eslint-disable require-jsdoc */
// 一時的な設定

import {injectable} from 'inversify';
import seq from '../mapping/connection';
import {StudentsMapper} from '../mapping/students';
import {IStudentRepository} from './IStudentRepository';

@injectable()
/**
 * StudentRepositoryImpl
 * @implements {IStudentRepository}
 */
export class StudentRepositoryImpl implements IStudentRepository {
  async findAll(): Promise<string> {
    const studentRepository = seq.getRepository(StudentsMapper);
    const found = await studentRepository
        .findAll({})
        .then((students) => {
          return students;
        })
        .catch((e) => {
          throw new Error(e);
        });
    return 'xxx';
  }
}
