import { Transaction } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import queueService from './queue.service';
import DB from '../models';
import IssueModel from '../models/issue.model';
import AgentModel from '../models/agent.model';

export class IssueService {

  static async queueServicePush(
    issueId: string,
    query: string = 'issues',
  ): Promise<string> {
    try {
      return queueService.send(query, { issueId });
    } catch (err) {
      return undefined;
    }
  }

  static async assignIssueToAgent(
    agent: AgentModel,
    issue: IssueModel,
  ): Promise<void> {
    await DB.transaction(async (transaction: Transaction) => {
      await agent.update({
        currentIssueId: issue.id,
        isAvailable: false
      }, {
        transaction
      });

      await issue.update({
        agentId: agent.id,
      }, {
        transaction
      });
    });
  }

  static async createIssue(user: string, name: string, description: string = '') {
    let isQueue = false;
    const issueId = uuidv4();
    try {
      const issue = await IssueModel.create({
        id: issueId,
        user,
        name,
        description,
        isResolved: false,
      });

      const agent = await AgentModel.findOne({
        where: {
          isAvailable: true,
        }
      });

      if (agent) {
        await IssueService.assignIssueToAgent(agent, issue);
      } else {
        const jobId = await IssueService.queueServicePush(issueId);
        isQueue = true;

        await issue.update({
          jobId
        });

        console.log(`created job in queue ${'issues'}: ${jobId}`);
      }
    } catch {
      await IssueService.queueServicePush(issueId);
    }
  }

  static async fetchJob(query: string) {
    let job;
    try {
      job = await queueService.fetch(query);

      if (job) {
        await queueService.complete(job.id);
      }
    } catch (err) {
      await queueService.fail(job.id, err);
    }
    return job;
  }

  static async resolveIssue(agentId: string, issueId: string) {

    const issue = await IssueModel.findOne({
      where: {
        id: issueId,
        agentId,
      }
    });

    if (issue) {
      await AgentModel.update({
        currentIssueId: null,
        isAvailable: true
      }, {
        where: {id: agentId}
      });

      await issue.update({
        isResolved: true,
      });

      const job = await IssueService.fetchJob('issues');

      if (!job) {
        return;
      }

      await IssueService.assignJobToAgent(job.id, agentId, job?.data);
    }
  }

  static async assignJobToAgent(
    jobId: string,
    agentId: string,
    data: any
  ): Promise<void> {

    const newIssue = data?.issueId
      ? await IssueModel.findOne({
          where: {
            id: data.issueId,
          }
        })
      : await IssueModel.findOne({
        where: {
          jobId,
        }
      });

    const agent = await AgentModel.findOne({
      where: {
        id: agentId,
      }
    });

    if (newIssue && agent)
      await IssueService.assignIssueToAgent(agent, newIssue);
  }
}