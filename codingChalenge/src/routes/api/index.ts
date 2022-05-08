import { json, Router, urlencoded } from 'express';
import {
    issueCreateValidation,
    issueResolveValidation,
    Validator
  } from '../validations';
import { IssueRoute } from './issue.route';

const v1 = Router();
const baseUrl = '/issue/v1';

const val = Validator.val;

v1.use(json());
v1.use(urlencoded({extended: true}));

v1.post(`${baseUrl}/create`, val(issueCreateValidation), IssueRoute.create);
v1.put(`${baseUrl}/resolve`, val(issueResolveValidation), IssueRoute.resolve);

export default v1;