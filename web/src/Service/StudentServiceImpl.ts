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
  async findAllStudents(): Promise<string> {
    const studentRepository = seq.getRepository(StudentsMapper);
    const found = await studentRepository.findAll().then((students) => {
      // return JSON.stringify(students);
      return JSON.parse(JSON.stringify(students));
    });
    return found;
  }

  async findOneStudent(id: number): Promise<string> {
    const studentRepository = seq.getRepository(StudentsMapper);
    const found = await studentRepository.findByPk(id).then((student) => {
      return JSON.parse(JSON.stringify(student));
      // return student;
    });
    return found;
  }

  // ゆくゆくはjson入力？？？
  // routesでreq.body.nameでいけるはず
  // /*
  async createStudent(name: string): Promise<string> {
    const studentRepository = seq.getRepository(StudentsMapper);
    const create = await studentRepository.create({
      // idの自動採番
      name: name,
      // createAt, updateAtは自動のはず
    }).then(() => {
      return '新規student作成';
    });
    return create;
  }
  // */

  async updateStudent(id: number, name: string): Promise<string> {
    const studentRepository = seq.getRepository(StudentsMapper);
    const update = await studentRepository.update(
        {
          name: name,
        },
        {
          where: {id: id},
        },
    ).then(() => {
      return 'student修正';
    });
    return update;
  }

  async deleteStudent(id: number): Promise<string> {
    const studentRepository = seq.getRepository(StudentsMapper);
    const update = await studentRepository.destroy({
      where: {id: id},
    }).then(() => {
      return 'student削除';
    });
    return update;
  }
}
