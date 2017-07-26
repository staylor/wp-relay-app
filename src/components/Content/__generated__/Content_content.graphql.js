/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Content_content = $ReadOnlyArray<{|
  +text?: ?string;
  +tagName?: ?string;
  +attributes?: ?$ReadOnlyArray<?{|
    +name: ?string;
    +value: ?string;
  |}>;
  +children?: ?$ReadOnlyArray<?{|
    +text?: ?string;
    +tagName?: ?string;
    +attributes?: ?$ReadOnlyArray<?{|
      +name: ?string;
      +value: ?string;
    |}>;
    +children?: ?$ReadOnlyArray<?{|
      +text?: ?string;
      +tagName?: ?string;
      +attributes?: ?$ReadOnlyArray<?{|
        +name: ?string;
        +value: ?string;
      |}>;
      +children?: ?$ReadOnlyArray<?{|
        +text?: ?string;
        +tagName?: ?string;
        +attributes?: ?$ReadOnlyArray<?{|
          +name: ?string;
          +value: ?string;
        |}>;
        +children?: ?$ReadOnlyArray<?{|
          +text?: ?string;
          +tagName?: ?string;
          +attributes?: ?$ReadOnlyArray<?{|
            +name: ?string;
            +value: ?string;
          |}>;
        |}>;
      |}>;
    |}>;
  |}>;
|}>;
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Content_content",
  "selections": [
    {
      "kind": "InlineFragment",
      "type": "Element",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "tagName",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "Meta",
          "name": "attributes",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "name",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "value",
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
          "name": "children",
          "plural": true,
          "selections": [
            {
              "kind": "InlineFragment",
              "type": "Element",
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "tagName",
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Meta",
                  "name": "attributes",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "name",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "value",
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
                  "name": "children",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "type": "Element",
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "args": null,
                          "name": "tagName",
                          "storageKey": null
                        },
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "args": null,
                          "concreteType": "Meta",
                          "name": "attributes",
                          "plural": true,
                          "selections": [
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "args": null,
                              "name": "name",
                              "storageKey": null
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "args": null,
                              "name": "value",
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
                          "name": "children",
                          "plural": true,
                          "selections": [
                            {
                              "kind": "InlineFragment",
                              "type": "Element",
                              "selections": [
                                {
                                  "kind": "ScalarField",
                                  "alias": null,
                                  "args": null,
                                  "name": "tagName",
                                  "storageKey": null
                                },
                                {
                                  "kind": "LinkedField",
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "Meta",
                                  "name": "attributes",
                                  "plural": true,
                                  "selections": [
                                    {
                                      "kind": "ScalarField",
                                      "alias": null,
                                      "args": null,
                                      "name": "name",
                                      "storageKey": null
                                    },
                                    {
                                      "kind": "ScalarField",
                                      "alias": null,
                                      "args": null,
                                      "name": "value",
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
                                  "name": "children",
                                  "plural": true,
                                  "selections": [
                                    {
                                      "kind": "InlineFragment",
                                      "type": "Element",
                                      "selections": [
                                        {
                                          "kind": "ScalarField",
                                          "alias": null,
                                          "args": null,
                                          "name": "tagName",
                                          "storageKey": null
                                        },
                                        {
                                          "kind": "LinkedField",
                                          "alias": null,
                                          "args": null,
                                          "concreteType": "Meta",
                                          "name": "attributes",
                                          "plural": true,
                                          "selections": [
                                            {
                                              "kind": "ScalarField",
                                              "alias": null,
                                              "args": null,
                                              "name": "name",
                                              "storageKey": null
                                            },
                                            {
                                              "kind": "ScalarField",
                                              "alias": null,
                                              "args": null,
                                              "name": "value",
                                              "storageKey": null
                                            }
                                          ],
                                          "storageKey": null
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "InlineFragment",
                                      "type": "Text",
                                      "selections": [
                                        {
                                          "kind": "ScalarField",
                                          "alias": null,
                                          "args": null,
                                          "name": "text",
                                          "storageKey": null
                                        }
                                      ]
                                    }
                                  ],
                                  "storageKey": null
                                }
                              ]
                            },
                            {
                              "kind": "InlineFragment",
                              "type": "Text",
                              "selections": [
                                {
                                  "kind": "ScalarField",
                                  "alias": null,
                                  "args": null,
                                  "name": "text",
                                  "storageKey": null
                                }
                              ]
                            }
                          ],
                          "storageKey": null
                        }
                      ]
                    },
                    {
                      "kind": "InlineFragment",
                      "type": "Text",
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "args": null,
                          "name": "text",
                          "storageKey": null
                        }
                      ]
                    }
                  ],
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "InlineFragment",
              "type": "Text",
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "text",
                  "storageKey": null
                }
              ]
            }
          ],
          "storageKey": null
        }
      ]
    },
    {
      "kind": "InlineFragment",
      "type": "Text",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "text",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "ContentNode"
};

module.exports = fragment;
