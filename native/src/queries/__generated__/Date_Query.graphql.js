/**
 * @flow
 * @relayHash 5d4b6d25d87220c0592f0a43f2bb84de
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type Date_QueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query Date_Query(
  $year: Int!
  $month: Int
  $day: Int
  $cursor: String
  $count: Int = 10
) {
  viewer {
    ...Date_viewer
    id
  }
}

fragment Date_viewer on Viewer {
  posts(year: $year, month: $month, day: $day, after: $cursor, first: $count) {
    edges {
      node {
        id
        title {
          raw
        }
        __typename
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "year",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "month",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "day",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": 10
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Date_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Date_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "Date_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "year",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "month",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "day",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": 10
      }
    ],
    "kind": "Root",
    "name": "Date_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "cursor",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "day",
                "variableName": "day",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "count",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "month",
                "variableName": "month",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "year",
                "variableName": "year",
                "type": "Int"
              }
            ],
            "concreteType": "PostConnection",
            "name": "posts",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PostEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Title",
                        "name": "title",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "raw",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasPreviousPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "cursor",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "day",
                "variableName": "day",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "count",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "month",
                "variableName": "month",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "year",
                "variableName": "year",
                "type": "Int"
              }
            ],
            "handle": "connection",
            "name": "posts",
            "key": "Date_posts",
            "filters": [
              "year",
              "month",
              "day"
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query Date_Query(\n  $year: Int!\n  $month: Int\n  $day: Int\n  $cursor: String\n  $count: Int = 10\n) {\n  viewer {\n    ...Date_viewer\n    id\n  }\n}\n\nfragment Date_viewer on Viewer {\n  posts(year: $year, month: $month, day: $day, after: $cursor, first: $count) {\n    edges {\n      node {\n        id\n        title {\n          raw\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}\n"
};

module.exports = batch;
