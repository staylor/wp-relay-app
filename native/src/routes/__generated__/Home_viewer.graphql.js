/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Home_viewer = {|
  +stickies: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +date: ?string;
        +title: ?{|
          +raw: ?string;
        |};
      |};
      +cursor: string;
    |}>;
  |};
  +readThis: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +date: ?string;
        +title: ?{|
          +raw: ?string;
        |};
      |};
      +cursor: string;
    |}>;
  |};
  +watchThis: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +date: ?string;
        +title: ?{|
          +raw: ?string;
        |};
      |};
      +cursor: string;
    |}>;
  |};
  +listenToThis: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +date: ?string;
        +title: ?{|
          +raw: ?string;
        |};
      |};
      +cursor: string;
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "stickiesTotal",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "readThisTotal",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "watchThisTotal",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "listenToThisTotal",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "stickiesTotal",
        "cursor": null,
        "direction": "forward",
        "path": [
          "stickies"
        ]
      },
      {
        "count": "readThisTotal",
        "cursor": null,
        "direction": "forward",
        "path": [
          "readThis"
        ]
      },
      {
        "count": "watchThisTotal",
        "cursor": null,
        "direction": "forward",
        "path": [
          "watchThis"
        ]
      },
      {
        "count": "listenToThisTotal",
        "cursor": null,
        "direction": "forward",
        "path": [
          "listenToThis"
        ]
      }
    ]
  },
  "name": "Home_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "stickies",
      "args": [
        {
          "kind": "Literal",
          "name": "sticky",
          "value": true,
          "type": "Boolean"
        }
      ],
      "concreteType": "PostConnection",
      "name": "__Home_stickies_connection",
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
        }
      ],
      "storageKey": "__Home_stickies_connection{\"sticky\":true}"
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
          "kind": "Literal",
          "name": "sticky",
          "value": false,
          "type": "Boolean"
        }
      ],
      "concreteType": "PostConnection",
      "name": "__Home_readThis_connection",
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
        }
      ],
      "storageKey": "__Home_readThis_connection{\"category\":\"read-this\",\"sticky\":false}"
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
        }
      ],
      "concreteType": "PostConnection",
      "name": "__Home_watchThis_connection",
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
        }
      ],
      "storageKey": "__Home_watchThis_connection{\"category\":\"watch-this\"}"
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
        }
      ],
      "concreteType": "PostConnection",
      "name": "__Home_listenToThis_connection",
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
        }
      ],
      "storageKey": "__Home_listenToThis_connection{\"category\":\"listen-to-this\"}"
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
