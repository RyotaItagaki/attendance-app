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
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import {DateMapper} from './date';
import {IAttend} from './IAttend';
import {MemberMapper} from './member';

const TABLE_NAME = 'attendance';
@Table({
  tableName: TABLE_NAME,
  timestamps: true,
  createdAt: 'creationdate',
  updatedAt: 'updatedon',
})
/**
 * 出席Mapper
 * @implements {IStudents}
 */
export class AttendMapper extends Model<AttendMapper> implements IAttend {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  // @PrimaryKey
  @ForeignKey(() => MemberMapper)
  @Column(DataType.INTEGER)
  public memberId: number;

  // @PrimaryKey
  @ForeignKey(() => DateMapper)
  @Column(DataType.INTEGER)
  public dateId: number;

  @Column(
      DataType.ENUM({
        // 出席、欠席、未定
        values: ['yes', 'no', 'unknown'],
      }),
  )
  public attendance: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  @BelongsTo(() => MemberMapper, 'memberId')
  public member!: MemberMapper;

  @BelongsTo(() => DateMapper, 'dateId')
  public date!: DateMapper;
}
