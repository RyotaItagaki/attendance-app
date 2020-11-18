/* eslint-disable require-jsdoc */
// 一時的な設定

import {injectable} from 'inversify';
import seq from '../mapping/connection';
import {StudentsMapper} from '../mapping/students';
import {IStudentService} from './IStudentService';

@injectable()
/**
 * StudentServiceImpl
 * @implements {IStudentService}
 */
export class StudentServiceImpl implements IStudentService {
  async findAll(): Promise<string> {
    const studentRepository = seq.getRepository(StudentsMapper);
    const found = await studentRepository.findAll().then((students) => {
      // return JSON.stringify(students);
      return JSON.parse(JSON.stringify(students));
    });
    // .toJSON();
    /*
        .then((students) => {
          return students;
        })
        .catch((e) => {
          throw new Error(e);
        });
        */
    return found;
  }
}
