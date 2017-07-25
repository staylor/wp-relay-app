/**
 * @flow
 * @relayHash c9a68a217c7b8c15ce3942c750d2cffd
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type Home_QueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query Home_Query(
  $stickiesTotal: Int = 2
  $watchThisTotal: Int = 5
  $readThisTotal: Int = 5
  $listenToThisTotal: Int = 5
) {
  viewer {
    ...Home_viewer
    id
  }
}

fragment Home_viewer on Viewer {
  stickies: posts(sticky: true, first: $stickiesTotal) {
    edges {
      node {
        id
        date
        title {
          raw
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
  readThis: posts(category: "read-this", sticky: false, first: $readThisTotal) {
    edges {
      node {
        id
        date
        title {
          raw
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
  watchThis: posts(category: "watch-this", first: $watchThisTotal) {
    edges {
      node {
        id
        date
        title {
          raw
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
  listenToThis: posts(category: "listen-to-this", first: $listenToThisTotal) {
    edges {
      node {
        id
        date
        title {
          raw
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "stickiesTotal",
        "type": "Int",
        "defaultValue": 2
      },
      {
        "kind": "LocalArgument",
        "name": "watchThisTotal",
        "type": "Int",
        "defaultValue": 5
      },
      {
        "kind": "LocalArgument",
        "name": "readThisTotal",
        "type": "Int",
        "defaultValue": 5
      },
      {
        "kind": "LocalArgument",
        "name": "listenToThisTotal",
        "type": "Int",
        "defaultValue": 5
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Home_Query",
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
            "name": "Home_viewer",
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
  "name": "Home_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "stickiesTotal",
        "type": "Int",
        "defaultValue": 2
      },
      {
        "kind": "LocalArgument",
        "name": "watchThisTotal",
        "type": "Int",
        "defaultValue": 5
      },
      {
        "kind": "LocalArgument",
        "name": "readThisTotal",
        "type": "Int",
        "defaultValue": 5
      },
      {
        "kind": "LocalArgument",
        "name": "listenToThisTotal",
        "type": "Int",
        "defaultValue": 5
      }
    ],
    "kind": "Root",
    "name": "Home_Query",
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
            "alias": "stickies",
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "stickiesTotal",
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "sticky",
                "value": true,
                "type": "Boolean"
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
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "date",
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startCursor",
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
            "alias": "stickies",
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "stickiesTotal",
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "sticky",
                "value": true,
                "type": "Boolean"
              }
            ],
            "handle": "connection",
            "name": "posts",
            "key": "Home_stickies",
            "filters": [
              "sticky"
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "readThis",
            "args": [
              {
                "kind": "Literal",
                "name": "category",
                "value": "read-this",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "readThisTotal",
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "sticky",
                "value": false,
                "type": "Boolean"
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
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "date",
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startCursor",
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
            "alias": "readThis",
            "args": [
              {
                "kind": "Literal",
                "name": "category",
                "value": "read-this",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "readThisTotal",
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "sticky",
                "value": false,
                "type": "Boolean"
              }
            ],
            "handle": "connection",
            "name": "posts",
            "key": "Home_readThis",
            "filters": [
              "category",
              "sticky"
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "watchThis",
            "args": [
              {
                "kind": "Literal",
                "name": "category",
                "value": "watch-this",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "watchThisTotal",
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
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "date",
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startCursor",
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
            "alias": "watchThis",
            "args": [
              {
                "kind": "Literal",
                "name": "category",
                "value": "watch-this",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "watchThisTotal",
                "type": "Int"
              }
            ],
            "handle": "connection",
            "name": "posts",
            "key": "Home_watchThis",
            "filters": [
              "category"
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "listenToThis",
            "args": [
              {
                "kind": "Literal",
                "name": "category",
                "value": "listen-to-this",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "listenToThisTotal",
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
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "date",
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startCursor",
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
            "alias": "listenToThis",
            "args": [
              {
                "kind": "Literal",
                "name": "category",
                "value": "listen-to-this",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "listenToThisTotal",
                "type": "Int"
              }
            ],
            "handle": "connection",
            "name": "posts",
            "key": "Home_listenToThis",
            "filters": [
              "category"
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
  "text": "query Home_Query(\n  $stickiesTotal: Int = 2\n  $watchThisTotal: Int = 5\n  $readThisTotal: Int = 5\n  $listenToThisTotal: Int = 5\n) {\n  viewer {\n    ...Home_viewer\n    id\n  }\n}\n\nfragment Home_viewer on Viewer {\n  stickies: posts(sticky: true, first: $stickiesTotal) {\n    edges {\n      node {\n        id\n        date\n        title {\n          raw\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  readThis: posts(category: \"read-this\", sticky: false, first: $readThisTotal) {\n    edges {\n      node {\n        id\n        date\n        title {\n          raw\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  watchThis: posts(category: \"watch-this\", first: $watchThisTotal) {\n    edges {\n      node {\n        id\n        date\n        title {\n          raw\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  listenToThis: posts(category: \"listen-to-this\", first: $listenToThisTotal) {\n    edges {\n      node {\n        id\n        date\n        title {\n          raw\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
};

module.exports = batch;
