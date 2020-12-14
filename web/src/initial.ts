import {AttendMapper} from './mapping/attendance';
import seq from './mapping/connection';
import {DateMapper} from './mapping/date';
import {GroupMapper} from './mapping/group';
import {MemberMapper} from './mapping/member';

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
