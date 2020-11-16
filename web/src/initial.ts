import seq from './mapping/connection';
import {StudentsMapper} from './mapping/students';
import {UserMapper} from './mapping/user';

// const userRepository = seq.getRepository(UserMapper);
const studentsRepository = seq.getRepository(StudentsMapper);

// userRepository.sync();
studentsRepository.sync();
