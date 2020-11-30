export interface IGroupService {
  // group全件取得
  findAllGroup(): Promise<string>;
  // groupのid指定して取得
  findGroup(id: number): Promise<string>;
  // group新規作成
  createGroup(name: string, explain: string): Promise<string>;
  // group編集
  updateGroup(id: number, name: string, explain: string): Promise<string>;
  // group削除
  deleteGroup(id: number): Promise<string>;
}
