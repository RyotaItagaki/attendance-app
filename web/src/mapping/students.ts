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
import {IStudents} from './IStudents';
import {TStudents} from './TStudents';

const TABLE_NAME = 'students';
@Table({
  tableName: TABLE_NAME,
  timestamps: true,
  createdAt: 'creationdate',
  updatedAt: 'updatedon',
})
/**
 * ユーザー用Mapper
 * @implements {TStudents}
 */
export class StudentsMapper extends Model<StudentsMapper> implements IStudents {
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;
}
