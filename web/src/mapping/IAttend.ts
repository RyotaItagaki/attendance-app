'use strict';

export interface IAttend {
  id: number;
  memberId: number;
  dateId: number;
  attendance: string; // enum
  createdAt: Date;
  updatedAt: Date;
};

