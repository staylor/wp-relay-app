/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule Single_viewer.graphql
 * @generated SignedSource<<ebe620accc98fc89ae5a88ed629cc742>>
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Single_viewer = {|
  +post: ?{|
    +id: string;
    +date: ?string;
    +title: ?{|
      +rendered: ?string;
    |};
    +content: ?{|
      +rendered: ?string;
    |};
    +featured_media: ?{| |};
    +tags: ?$ReadOnlyArray<?{|
      +id: string;
      +name: ?string;
    |}>;
    +comments: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string;
          +parent: ?string;
        |};
      |}>;
    |};
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "id",
      "type": "ID"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "post",
          "comments"
        ]
      }
    ]
  },
  "name": "Single_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id",
          "type": "ID"
        }
      ],
      "concreteType": "Post",
      "name": "post",
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
              "name": "rendered",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "Content",
          "name": "content",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "rendered",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": null,
          "name": "featured_media",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "Media_media",
              "args": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "Tag",
          "name": "tags",
          "plural": true,
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
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": "comments",
          "args": [
            {
              "kind": "Variable",
              "name": "post",
              "variableName": "id",
              "type": "ID"
            }
          ],
          "concreteType": "CommentConnection",
          "name": "__Single_post_comments_connection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "CommentEdge",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Comment",
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
                      "name": "parent",
                      "storageKey": null
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "Comment_comment",
                      "args": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
