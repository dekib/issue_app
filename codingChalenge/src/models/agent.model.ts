import {
    Column,
    CreatedAt,
    DataType,
    HasMany,
    Model,
    Table,
    UpdatedAt
  } from 'sequelize-typescript';
  import IssueModel from './issue.model';

  @Table({
    modelName: 'agents',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  })
  export default class AgentModel extends Model<AgentModel> {

    @Column({
      field: 'id',
      type: DataType.UUID,
      primaryKey: true
    })
    id: string;

    @HasMany(() => IssueModel, {
      hooks: true
    })
    issue: IssueModel[];

    @Column({field: 'name'})
    name: string;

    @Column({
      field: 'current_issue_id',
      type: DataType.UUID
    })
    currentIssueId: string;

    @Column({field: 'is_available'})
    isAvailable: boolean;

    @Column({field: 'created_at'})
    @CreatedAt
    createdAt: Date;

    @Column({field: 'updated_at'})
    @UpdatedAt
    updatedAt: Date;
  }