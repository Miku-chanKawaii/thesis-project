/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tqih3tns4hqdm9h",
    "created": "2024-11-27 08:10:07.159Z",
    "updated": "2024-11-27 08:10:07.159Z",
    "name": "catalogue",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rli9epdk",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tqih3tns4hqdm9h");

  return dao.deleteCollection(collection);
})
