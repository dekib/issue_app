import { NextFunction, Request, Response } from 'express';
import { IssueService } from '../../services/issue.service';

export class IssueRoute {

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {user, issueName, description} = req.body;
      if (!user || !issueName) throw new Error('Missing user or issue name');

      await IssueService.createIssue(user, issueName, description);

      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  static async resolve(req: Request, res: Response, next: NextFunction) {
    try {
      const {agentId, issueId} = req.body;
      if (!agentId || !agentId) throw new Error('Missing user or issue name');

      await IssueService.resolveIssue(agentId, issueId);
      // const response = await TrackService.getGroupList(uuid.replace(/\+/g, '-'), groupId.replace(/\+/g, '-'));
      // if (response && Array.isArray(response.groupList)) {
      //   res.status(200).send(APIResponse.success(response)).end();
      // } else {
      //   // logger.warn('listGroup getGroupList: ', req && req.params);
      // }
      res.status(201).end();
    } catch (err) {
      // const params = JSON.stringify(get(req, 'params', {}));
      // logger.error(`listGroup params: ${params}; error: `, err);
      next(err);
    }
  }
}