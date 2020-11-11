/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DataType,
  Unique,
  PrimaryKey,
  HasOne,
  AllowNull,
} from 'sequelize-typescript';
import {IUser} from '../model/IUser';

const TABLE_NAME = 'user';
@Table({
  tableName: TABLE_NAME,
  timestamps: true,
  createdAt: 'creationdate',
  updatedAt: 'updatedon',
})
/**
 * ユーザー用Mapper
 * @implements {IUser}
 */
export class UserMapper extends Model<UserMapper> implements IUser {
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  userName: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;
}
