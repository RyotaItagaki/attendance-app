'use strict';

export interface IAttend {
  memberId: number;
  dateId: number;
  attendance: string; // enum
  createdAt: Date;
  updatedAt: Date;
};

