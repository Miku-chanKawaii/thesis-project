/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zkwtmm0z3ja3bot");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "zkwtmm0z3ja3bot",
    "created": "2024-11-28 07:50:20.670Z",
    "updated": "2024-11-28 07:50:20.670Z",
    "name": "creators",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0r27o8fj",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "qbwhlb4n",
        "name": "product",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "4qmbeqdk7l57s8o",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
