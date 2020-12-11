export interface IDateService {
  // Group内のdate取得
  findDateInGroup(groupId: number): Promise<string>;
  // memberのid指定して取得
  findDate(id: number): Promise<string>;
  // member作成
  createDate(
    groupId: number,
    date: Date,
    otherInfo: string,
    ): Promise<string>;
    createDate2(
      groupId: number,
      date: Date,
      otherInfo: string,
      ): Promise<{ id: number; message: string; }>;
  // member更新
  updateDate(
    id: number,
    date: Date,
    otherInfo: string,
    ): Promise<string>;
  // member削除
  deleteDate(id: number): Promise<string>;
}
