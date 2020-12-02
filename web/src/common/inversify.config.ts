import {Container} from 'inversify';
import {TYPES} from './Types';
import {IStudentService} from '../Service/IStudentService';
import {StudentServiceImpl} from '../Service/StudentServiceImpl';
import {IGroupService} from '../Service/IGroupService';
import {GroupServiceImpl} from '../Service/GroupServiceImpl';
import {IMemberService} from '../Service/IMemberService';
import {MemberServiceImpl} from '../Service/MemberServiceImpl';

const container = new Container();
container
    .bind<IStudentService>(TYPES.IStudentService)
    .to(StudentServiceImpl)
    .inSingletonScope();
container
    .bind<IGroupService>(TYPES.IGroupService)
    .to(GroupServiceImpl)
    .inSingletonScope();
container
    .bind<IMemberService>(TYPES.IMemberService)
    .to(MemberServiceImpl)
    .inSingletonScope();

export {container};
