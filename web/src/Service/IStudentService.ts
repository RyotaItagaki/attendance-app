// import {StudentsMapper} from '../mapping/students';

export interface IStudentService {
  // student全件取得
  findAllStudents(): Promise<string>;
  // studentのid指定して取得
  findOneStudent(id: number): Promise<string>;
  // student新規作成
  createOneStudent(name: string): Promise<string>;
  // student編集
  // student削除
}
