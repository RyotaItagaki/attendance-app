import {AttendMapper} from './mapping/attendance';
import seq from './mapping/connection';
import {DateMapper} from './mapping/date';
import {GroupMapper} from './mapping/group';
import {MemberMapper} from './mapping/member';
import {StudentsMapper} from './mapping/students';
import {UserMapper} from './mapping/user';

// const userRepository = seq.getRepository(UserMapper);
// const studentsRepository = seq.getRepository(StudentsMapper);
const groupRepository = seq.getRepository(GroupMapper);
const memberRepository = seq.getRepository(MemberMapper);
const dateRepository = seq.getRepository(DateMapper);
const attendRepository = seq.getRepository(AttendMapper);

groupRepository.sync().then(() => {
  memberRepository.sync();
  dateRepository.sync().then(() => {
    attendRepository.sync();
  });
});
