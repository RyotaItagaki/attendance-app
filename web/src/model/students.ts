'use strict';

import {IStudents} from '../mapping/IStudents';

/** */
export class Students implements IStudents {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
