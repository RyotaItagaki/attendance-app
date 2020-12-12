import {Container} from 'inversify';
import {TYPES} from './Types';
import {IGroupService} from '../Service/IGroupService';
import {GroupServiceImpl} from '../Service/GroupServiceImpl';
import {IMemberService} from '../Service/IMemberService';
import {MemberServiceImpl} from '../Service/MemberServiceImpl';
import {IDateService} from '../Service/IDateService';
import {DateServiceImpl} from '../Service/DateServiceImpl';
import {IAttendanceService} from '../Service/IAttendanceService';
import {AttendanceServiceImpl} from '../Service/AttendanceServiceImpl';

const container = new Container();
container
    .bind<IGroupService>(TYPES.IGroupService)
    .to(GroupServiceImpl)
    .inSingletonScope();
container
    .bind<IMemberService>(TYPES.IMemberService)
    .to(MemberServiceImpl)
    .inSingletonScope();
container
    .bind<IDateService>(TYPES.IDateService)
    .to(DateServiceImpl)
    .inSingletonScope();
container
    .bind<IAttendanceService>(TYPES.IAttendanceService)
    .to(AttendanceServiceImpl)
    .inSingletonScope();

export {container};
