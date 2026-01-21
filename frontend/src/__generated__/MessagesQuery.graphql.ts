/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type MessagesQuery$variables = Record<PropertyKey, never>;
export type MessagesQuery$data = {
  readonly messages: ReadonlyArray<{
    readonly id: string;
    readonly text: string;
    readonly timestamp: string;
  }>;
};
export type MessagesQuery = {
  response: MessagesQuery$data;
  variables: MessagesQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "messages",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "timestamp",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "messages",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "timestamp",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a1b2c3d4e5f6",
    "id": null,
    "metadata": {},
    "name": "MessagesQuery",
    "operationKind": "query",
    "text": "query MessagesQuery {\n  messages {\n    id\n    text\n    timestamp\n  }\n}\n"
  }
};

export default node;
