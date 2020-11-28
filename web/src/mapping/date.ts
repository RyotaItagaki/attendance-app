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
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import {AttendMapper} from './attendance';
import {GroupMapper} from './group';
import {IDate} from './IDate';
import {MemberMapper} from './member';

const TABLE_NAME = 'date';
@Table({
  tableName: TABLE_NAME,
  timestamps: true,
  createdAt: 'creationdate',
  updatedAt: 'updatedon',
})
/**
 * ユーザー用Mapper
 * @implements {IStudents}
 */
export class DateMapper extends Model<DateMapper> implements IDate {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => GroupMapper)
  @Column(DataType.INTEGER)
  public groupId: number;

  @Column(DataType.DATE)
  public date: Date;

  @Column(DataType.STRING)
  public otherInfo: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  @BelongsTo(() => GroupMapper, 'groupId')
  public group!: GroupMapper;

  @BelongsToMany(() => MemberMapper, () => AttendMapper)
  public member!: MemberMapper;
}
