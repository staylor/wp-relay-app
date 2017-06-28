/**
 * @flow
 * @relayHash 920b9f53bb6570a68158b6d906dc1b03
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteComment_MutationVariables = {|
  input: {
    id: string;
    clientMutationId?: ?string;
  };
|};

export type DeleteComment_MutationResponse = {|
  +deleteComment: ?{|
    +status: ?string;
  |};
|};
*/


/*
mutation DeleteComment_Mutation(
  $input: DeleteCommentInput!
) {
  deleteComment(input: $input) {
    status
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteCommentInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteComment_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteCommentInput!"
          }
        ],
        "concreteType": "DeleteCommentPayload",
        "name": "deleteComment",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DeleteComment_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteCommentInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteComment_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteCommentInput!"
          }
        ],
        "concreteType": "DeleteCommentPayload",
        "name": "deleteComment",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteComment_Mutation(\n  $input: DeleteCommentInput!\n) {\n  deleteComment(input: $input) {\n    status\n  }\n}\n"
};

module.exports = batch;
