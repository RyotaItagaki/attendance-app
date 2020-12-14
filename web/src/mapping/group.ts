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
} from 'sequelize-typescript';
import {DateMapper} from './date';
import {IGroup} from './IGroup';
import {MemberMapper} from './member';

const TABLE_NAME = 'group';
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
export class GroupMapper extends Model<GroupMapper> implements IGroup {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.STRING)
  public groupName: string;

  @Column(DataType.STRING)
  public explain: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  @HasMany(() => MemberMapper, 'groupId')
  public member!: MemberMapper[];

  @HasMany(() => DateMapper, 'groupId')
  public group!: DateMapper[];
}
