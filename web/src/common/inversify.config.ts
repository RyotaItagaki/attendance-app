import {Container} from 'inversify';
import {TYPES} from './Types';
import {IStudentService} from '../Service/IStudentService';
import {StudentServiceImpl} from '../Service/StudentServiceImpl';

const container = new Container();
container
    .bind<IStudentService>(TYPES.IStudentService)
    .to(StudentServiceImpl)
    .inSingletonScope();

export {container};
