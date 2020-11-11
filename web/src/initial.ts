import seq from './mapping/connection';
import {UserMapper} from './mapping/user';

const userRepository = seq.getRepository(UserMapper);

userRepository.sync();
