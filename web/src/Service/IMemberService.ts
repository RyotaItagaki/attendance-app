export interface IMemberService {
  // Group内のmember取得
  findMemberInGroup(groupId: number): Promise<string>;
  // memberのid指定して取得
  findMember(id: number): Promise<string>;
  // member作成
  createMember(
    groupId: number,
    number: number,
    name: string,
    sex: string,
    otherInfo: string,
  ): Promise<{ id: number; message: string; }>;
  // member更新
  updateMember(
    id: number,
    number: number,
    name: string,
    sex: string,
    otherInfo: string,
  ): Promise<string>;
  // member削除
  deleteMember(id: number): Promise<string>;
}
