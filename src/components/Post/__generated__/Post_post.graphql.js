/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule Post_post.graphql
 * @generated SignedSource<<cdbbd9acb953d59d35e42e9d8342f108>>
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Post_post = {|
  +id: string;
  +title: ?{|
    +rendered: ?string;
  |};
  +content: ?{|
    +rendered: ?string;
  |};
  +excerpt: ?{|
    +rendered: ?string;
  |};
  +featuredMedia: ?{| |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Post_post",
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
      "concreteType": "Excerpt",
      "name": "excerpt",
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
      "name": "featuredMedia",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Media_media",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post"
};

module.exports = fragment;
