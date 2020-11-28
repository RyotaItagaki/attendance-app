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
import {DateMapper} from './date';
import {GroupMapper} from './group';
import {IMember} from './IMember';

const TABLE_NAME = 'member';
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
export class MemberMapper extends Model<MemberMapper> implements IMember {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => GroupMapper)
  @Column(DataType.INTEGER)
  public groupId: number;

  @Column(DataType.INTEGER)
  public number: number;

  @Column(DataType.STRING)
  public name: string;

  @Column(
      DataType.ENUM({
        values: ['man', 'woman', 'other'],
      }),
  )
  public sex: string;

  @Column(DataType.STRING)
  public otherInfo: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  @BelongsTo(() => GroupMapper, 'groupId')
  public group!: GroupMapper;

  @BelongsToMany(() => DateMapper, () => AttendMapper)
  public date!: DateMapper;
}
