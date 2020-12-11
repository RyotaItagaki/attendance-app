export interface inputAttendance {
  memberId: number,
  dateId: number,
  attendance: string,
}

export interface IAttendanceService {
  // Attendance全取得
  findAllAttendance(
    memberIds: number[],
    dateIds: number[],
  ): Promise<string>
  // Attendance取得
  // idで良い
  findAttendance(
    id: number,
    // memberId: number,
    // dateId: number,
  ): Promise<string>;
  // Attendance作成
  createAttendance(
    memberId: number,
    dateId: number,
    attendance: string,
  ): Promise<string>;
  // Attendance複数作成
  createAttendanceMany(
    input: inputAttendance[]
  ): Promise<string>;
  // Attendance更新
  // id特定
  updateAttendance(
    id: number,
    attendance: string,
  ): Promise<string>;
  updateAttendanceMany(
    memberId: number,
    dateId: number,
    attendance: string,
  ): Promise<string>;
  // Attendance削除（必要？）
  /*
  deleteAttendance(
    memberId: number,
    dateId: number,
    ): Promise<string>;
  // */
}
