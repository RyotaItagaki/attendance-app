import {Container} from 'inversify';
import {TYPES} from './Types';
import {IStudentService} from '../Service/IStudentService';
import {StudentServiceImpl} from '../Service/StudentServiceImpl';
import {IGroupService} from '../Service/IGroupService';
import {GroupServiceImpl} from '../Service/GroupServiceImpl';

const container = new Container();
container
    .bind<IStudentService>(TYPES.IStudentService)
    .to(StudentServiceImpl)
    .inSingletonScope();
container
    .bind<IGroupService>(TYPES.IGroupService)
    .to(GroupServiceImpl)
    .inSingletonScope();

export {container};
