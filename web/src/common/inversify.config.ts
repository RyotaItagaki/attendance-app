import {Container} from 'inversify';
import {TYPES} from './Types';
import {IStudentRepository} from '../repository/IStudentRepository';
import {StudentRepositoryImpl} from '../repository/StudentRepositoryImpl';

const container = new Container();
container
    .bind<IStudentRepository>(TYPES.IStudentsRepository)
    .to(StudentRepositoryImpl)
    .inSingletonScope();
