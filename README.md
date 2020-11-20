# 出欠確認アプリ

## データ特定・リソース設計
### 対象リソース
* 生徒リソース
* (検索結果リソース)

## URI設計

|メソッド|URI|詳細|
|-|-|-|
|GET|`/attendance`|生徒リスト取得|
|GET|`/attendance/123`|生徒情報の習得|
|POST|`/attendance`|新規生徒作成|
|PUT|`/attendance/123`|生徒情報の更新|
|DELETE|`/attendance/123`|生徒の削除|

## ユースケース
### アクター：ユーザー（先生）
* 
* 生徒を新規に追加する

* curlコマンド

```
// GETメソッド
$ curl -X GET http://localhost:3000
```



* memo

```
$ insert into students (id, name, creationdate, updatedon) values (1, '板垣亮太', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

$ insert into students (id, name, creationdate, updatedon) values (2, '工藤だいし', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

$ insert into students (id, name, creationdate, updatedon) values (3, '藤田優一', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

$ insert into students (name, creationdate, updatedon) values ('中村真太郎', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```