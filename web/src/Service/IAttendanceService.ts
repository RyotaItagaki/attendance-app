export interface IAttendanceService {
  // Attendance全取得
  findAllAttendance(
    memberIds: number[],
    dateIds: number[],
  ): Promise<string>
  // Attendance取得
  findAttendance(
    memberId: number,
    dateId: number,
    ): Promise<string>;
  // Attendance作成
  createAttendance(
    memberId: number,
    dateId: number,
    attendance: string,
    ): Promise<string>;
  // Attendance更新
  updateAttendance(
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
