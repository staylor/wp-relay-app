/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule Stickies_Query.graphql
 * @generated SignedSource<<f404b3b03ecd12181e9f02233b01c5bc>>
 * @relayHash 0489ecdaf912de3ab8335338668338c2
 * @flow
 * @nogrep
 */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/

/* eslint-disable comma-dangle, quotes */

/*
query Stickies_Query {
  stickies {
    results(first: 5) {
      edges {
        node {
          id
          ...Post_post
        }
      }
    }
  }
}

fragment Post_post on Post {
  id
  title {
    rendered
  }
  content {
    rendered
  }
  excerpt {
    rendered
  }
  featured_media {
    __typename
    ...Media_media
    ... on Image {
      id
    }
    ... on Audio {
      id
    }
    ... on Video {
      id
    }
  }
}

fragment Media_media on Media {
  __typename
  ...Image_image
}

fragment Image_image on Media {
  ... on Image {
    source_url
    media_details {
      sizes {
        name
        source_url
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Stickies_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "PostCollection",
        "name": "stickies",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5,
                "type": "Int"
              }
            ],
            "concreteType": "PostConnection",
            "name": "results",
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
                        "kind": "FragmentSpread",
                        "name": "Post_post",
                        "args": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "results{\"first\":5}"
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
  "name": "Stickies_Query",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "Stickies_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "PostCollection",
        "name": "stickies",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5,
                "type": "Int"
              }
            ],
            "concreteType": "PostConnection",
            "name": "results",
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
                        "name": "featured_media",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "__typename",
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Video",
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Audio",
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Image",
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "source_url",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "ImageDetails",
                                "name": "media_details",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "MediaSize",
                                    "name": "sizes",
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
                                        "name": "source_url",
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
                                "name": "id",
                                "storageKey": null
                              }
                            ]
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
            "storageKey": "results{\"first\":5}"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query Stickies_Query {\n  stickies {\n    results(first: 5) {\n      edges {\n        node {\n          id\n          ...Post_post\n        }\n      }\n    }\n  }\n}\n\nfragment Post_post on Post {\n  id\n  title {\n    rendered\n  }\n  content {\n    rendered\n  }\n  excerpt {\n    rendered\n  }\n  featured_media {\n    __typename\n    ...Media_media\n    ... on Image {\n      id\n    }\n    ... on Audio {\n      id\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment Media_media on Media {\n  __typename\n  ...Image_image\n}\n\nfragment Image_image on Media {\n  ... on Image {\n    source_url\n    media_details {\n      sizes {\n        name\n        source_url\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
