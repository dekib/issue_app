import {
    BelongsTo,
    Column,
    DataType,
    CreatedAt,
    ForeignKey,
    Model,
    Table,
    UpdatedAt
  } from 'sequelize-typescript';
  import AgentModel from './agent.model';

  @Table({
    modelName: 'issue',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  })
  export default class IssueModel extends Model<IssueModel> {

    @Column({
      field: 'id',
      type: DataType.UUID,
      primaryKey: true
    })
    id: string;

    @BelongsTo(() => AgentModel)
    AgentModel: AgentModel;

    @ForeignKey(() => AgentModel)
    @Column({field: 'agent_id'})
    agentId: string;

    @Column({field: 'user'})
    user: string;

    @Column({field: 'name'})
    name: string;

    @Column({field: 'description'})
    description: string;

    @Column({field: 'is_resolved'})
    isResolved: boolean;

    @Column({field: 'job_id'})
    jobId: string;

    @Column({field: 'created_at'})
    @CreatedAt
    createdAt: Date;

    @Column({field: 'updated_at'})
    @UpdatedAt
    updatedAt: Date;
  }