export interface inputAttendance {
  memberId: number,
  dateId: number,
  attendance: string,
}

export interface IAttendanceService {
  // Attendance全取得
  findAllAttendance( // 1
    memberIds: number[],
    dateIds: number[],
  ): Promise<string>
  // Attendance取得
  findAttendance( // 2
    id: number,
  ): Promise<string>;
  // Attendance複数作成
  createAttendanceMany( // 4,5
    input: inputAttendance[]
  ): Promise<string>;
  // Attendance更新
  updateAttendance( // 3
    id: number,
    attendance: string,
  ): Promise<string>;

  // Attendance削除はなし
}
