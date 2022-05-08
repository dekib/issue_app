import { body } from 'express-validator';

export const issueCreateValidation = [
  body('user')
    .notEmpty().withMessage('user must be provided.')
    .isString().withMessage('user must be text.'),
  body('issueName')
    .notEmpty().withMessage('issueName must be provided.')
    .isString().withMessage('issueName must be text.'),
  body('description')
    .isString().withMessage('description must be text.'),
];

export const issueResolveValidation = [
  body('agentId')
    .notEmpty()
    .isUUID().withMessage('uuid not valid.'),
    body('issueId')
    .notEmpty()
    .isUUID().withMessage('uuid not valid.'),
];
