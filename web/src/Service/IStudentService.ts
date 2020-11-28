// import {StudentsMapper} from '../mapping/students';

export interface IStudentService {
  // student全件取得
  findAllStudents(): Promise<string>;
  // studentのid指定して取得
  findOneStudent(id: number): Promise<string>;
  // student新規作成
  createStudent(name: string): Promise<string>;
  // student編集
  updateStudent(id: number, name: string): Promise<string>;
  // student削除
  deleteStudent(id: number): Promise<string |false>;
}
