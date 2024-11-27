/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rpx90pan",
    "name": "catalogue",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tqih3tns4hqdm9h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  // remove
  collection.schema.removeField("rpx90pan")

  return dao.saveCollection(collection)
})