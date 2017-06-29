/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type App_viewer = {|
  +settings: ?{|
    +title: ?string;
    +description: ?string;
    +language: ?string;
  |};
  +navMenu: ?{| |};
  +sidebar: ?{| |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "menuID",
      "type": "ID"
    },
    {
      "kind": "RootArgument",
      "name": "sidebarID",
      "type": "ID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "App_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Settings",
      "name": "settings",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "title",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "description",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "language",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "menuID",
          "type": "ID"
        }
      ],
      "concreteType": "NavMenu",
      "name": "navMenu",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "NavMenu_navMenu",
          "args": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "sidebarID",
          "type": "ID"
        }
      ],
      "concreteType": "Sidebar",
      "name": "sidebar",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Sidebar_sidebar",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
